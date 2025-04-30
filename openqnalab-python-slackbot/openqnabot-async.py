import json
import os
import requests

SALESFORCE_ACCESS_TOKEN = os.environ['SALESFORCE_ACCESS_TOKEN']
SALESFORCE_INSTANCE_URL = os.environ['SALESFORCE_INSTANCE_URL']

def lambda_handler(event, context):
    print('Event received:', json.dumps(event))

    for record in event['Records']:
        try:
            message = json.loads(record['body'])
            query = message['query']
            response_url = message['response_url']

            print(f"Processing query: {query}")
            print(f"Using response_url: {response_url}")

            # Salesforce API call
            sf_response = requests.post(
                f"{SALESFORCE_INSTANCE_URL}/services/apexrest/AgentQuery/",
                headers={
                    "Authorization": f"Bearer {SALESFORCE_ACCESS_TOKEN}",
                    "Content-Type": "application/json"
                },
                json={"query": query},
                timeout=30
            )

            answer_text = "No answer found."

            try:
                # Step 1: Parse first response
                first_pass = json.loads(sf_response.text)
                print(f"[Step 1] First pass JSON: {first_pass}")

                if isinstance(first_pass, list) and len(first_pass) > 0:
                    second_pass = first_pass[0]
                else:
                    second_pass = first_pass

                print(f"[Step 1] Second pass raw: {second_pass}")

                # ⚡️关键：如果second_pass是str，再解析一次
                if isinstance(second_pass, str):
                    second_pass = json.loads(second_pass)
                    print(f"[Step 1] Second pass parsed into dict: {second_pass}")

                # Step 2: Extract answer field
                answer_string = second_pass.get('answer', '{}')
                print(f"[Step 2] Extracted answer string: {answer_string}")

                # Step 3: Parse answer string to inner JSON
                inner_result = json.loads(answer_string)
                print(f"[Step 3] Inner parsed JSON: {inner_result}")

                # Step 4: Extract value
                final_answer = inner_result.get('value', 'No value found.')
                print(f"[Step 4] Final extracted answer: {final_answer}")

            except Exception as e:
                print(f"[Error] Parsing Salesforce response: {e}")
                final_answer = "Error processing Salesforce response."

            slack_payload = {
                "response_type": "in_channel",
                "text": f"💬 *Question:* {query}\n\n🧠 *Answer:* {final_answer}"
            }
            print(f"Sending Slack payload: {json.dumps(slack_payload)}")

            slack_response = requests.post(response_url, json=slack_payload)
            print(f"Slack POST response: {slack_response.status_code} - {slack_response.text}")

            if slack_response.status_code != 200:
                print('Slack POST failed')

        except Exception as e:
            print(f"Error processing record: {e}")
