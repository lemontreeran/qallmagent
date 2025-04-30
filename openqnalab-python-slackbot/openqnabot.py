import os
import json
import base64
import hmac
import hashlib
import time
import boto3
from urllib.parse import parse_qs

SALESFORCE_ACCESS_TOKEN = os.environ['SALESFORCE_ACCESS_TOKEN']
SALESFORCE_INSTANCE_URL = os.environ['SALESFORCE_INSTANCE_URL']
SLACK_SIGNING_SECRET = os.environ['SLACK_SIGNING_SECRET']
SQS_QUEUE_URL = os.environ['SQS_QUEUE_URL']

def verify_slack_request(headers, body):
    request_timestamp = headers.get('x-slack-request-timestamp')
    slack_signature = headers.get('x-slack-signature')

    if not request_timestamp or not slack_signature:
        print("Missing signature headers.")
        return False

    current_time = int(time.time())
    if abs(current_time - int(request_timestamp)) > 60 * 5:
        print("Request timestamp is too old.")
        return False

    sig_basestring = f"v0:{request_timestamp}:{body}".encode('utf-8')
    my_signature = 'v0=' + hmac.new(
        SLACK_SIGNING_SECRET.encode('utf-8'),
        sig_basestring,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(my_signature, slack_signature)

def send_to_sqs(query, response_url):
    sqs = boto3.client('sqs')
    message = {
        'query': query,
        'response_url': response_url
    }
    sqs.send_message(
        QueueUrl=SQS_QUEUE_URL,
        MessageBody=json.dumps(message)
    )

def lambda_handler(event, context):
    try:
        headers = {k.lower(): v for k, v in event['headers'].items()}

        if event.get('isBase64Encoded', False):
            body = base64.b64decode(event['body']).decode('utf-8')
        else:
            body = event['body']

        if not verify_slack_request(headers, body):
            return {
                "statusCode": 401,
                "body": "Slack verification failed"
            }

        parsed_body = parse_qs(body)
        command = parsed_body.get('command', [''])[0]
        query = parsed_body.get('text', [''])[0]
        response_url = parsed_body.get('response_url', [''])[0]

        print(f"Command received: {command}, Query: {query}")

        # ✅ /ask command
        if command == '/ask':
            if not query:
                return {
                    "statusCode": 200,
                    "body": "Please provide a question after /ask"
                }

            send_to_sqs(query, response_url)

            return {
                "statusCode": 200,
                "body": "Got it! Thinking... 🤔"
            }

        # ✅ /contract command
        elif command == '/contract':
            return {
                "statusCode": 200,
                "body": "Your contract file has been received successfully! 📄✅"
            }

        # ❌ Unknown command
        else:
            return {
                "statusCode": 200,
                "body": "Unknown command"
            }

    except Exception as e:
        print('Exception:', str(e))
        return {
            "statusCode": 500,
            "body": "Internal server error"
        }
