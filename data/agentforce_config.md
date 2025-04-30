# Configure Agentforce for Service | Salesforce Trailhead
Learning Objectives
-------------------

In this project, you’ll:

*   Create a service agent through guided setup.  
    
*   Associate topics and actions to the service agent.  
    
*   Build custom agent actions with flows.  
    
*   Update an existing deployment flow.  
    

Coral Cloud Resorts + Agentforce
--------------------------------

Coral Cloud Resorts is known for two things: amazing destination activities and top-notch customer service. Business is booming. Coral Cloud’s customer service agents are busy providing activity recommendations and booking activities for clients. With the busy season upcoming, Coral Cloud Resorts needs to scale its service assistance quickly. If only there was a tool to help. Agentforce for Service to the rescue! A service agent can assist Coral Cloud clients with experience availability, booking, and more.

Enable Agents, Publish the Experience Cloud Site, and More
----------------------------------------------------------

Step one of building an agent is enabling all of the required org features.

1.  Click ![setup icon](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/6ca766596f822febd7c78313c944cf6f_kix.m3yulxcywi0y.jpg) and click **Setup**. The Setup page opens in a new tab.  
    
2.  In the Setup Quick Find, search for and select **Einstein Setup**.  
    
3.  Click the **Turn on Einstein** toggle, and make sure Einstein is **On**.  
    
4.  Refresh your browser to reload Setup.  
    
5.  In the Setup Quick Find, search for and select **Agents**.  
    
6.  Click the **Agentforce** toggle, and ensure it is set to **On**.  
    

![Agentforce toggle set to On.](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/fffed8913e501b6148b046c35f3b6ed7_kix.kowb374l9ibi.png)

### Publish the Experience Cloud Site

The agent is deployed via Coral Cloud’s Experience Cloud site. To prepare for deployment, get the Experience Cloud site ready for the new agent.

1.  In the Setup Quick Find, search and select **All Sites**.  
    
2.  Click **Builder** next to the coral-cloud site. If a popup appears, click **OK**.  
    
3.  Click **Publish** in the upper right corner.  
    
4.  Click **Publish** in the confirmation window.  
    
5.  Click **Got It**.  
    
6.  Click the **Experience Builder menu** ![Experience Builder menu icon](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/23eb521e0176abf28d2566620ec862ed_kix.hh0l4vhvc8ht.png) .  
    
7.  Click **Salesforce Setup**.  
    
8.  Refresh your browser to reload Setup. Feel free to close the Experience Site browser tab.  
    

Create the Agent
----------------

The first step in creating an agent is the guided setup. This setup process walks through creating an agent, associating topics, and more. Topics define the range of jobs your agents can handle. Actions are the tools they can use to get the jobs done. For example, if a client asks about a topic, what action(s) should the agent produce?

1.  In the Setup Quick Find, search for and select **Agents**.  
    
2.  Click **\+ New Agent**. Note: If the New Agent button is not present, refresh the page until the button appears.  
    
3.  Select **Agentforce Service Agent** as the type.  
    
4.  Click **Next**.  
    
5.  Leave all the Topics as Added and click **Next**.  
    
6.  Define the settings of the agent as follows:  
    



* Field: Name
  * Value: CC Service Agent
* Field: API Name
  * Value: CC_Service_Agent
* Field: Description
  * Value: Deliver personalized customer interactions with an autonomous AI agent. Agentforce Service Agent intelligently supports your customers with common inquiries and escalates complex issues.
* Field: Role
  * Value: You are a customer service representative, helping our guests make reservations, update bookings, and navigate all that Coral Cloud Resorts has to offer.
* Field: Company
  * Value: Coral Cloud Resorts provides customers with exceptional destination activities, unforgettable experiences, and reservation services, all backed by a commitment to top-notch customer service.
* Field: Agent User
  * Value: EinsteinServiceAgent User
* Field: Enrich event logs with conversation data
  * Value: Enabled


7.  Leave everything else as is and click **Next**.  
    
8.  For now, Data Cloud won’t be used. Click **Create**.  
    
9.  With the agent now created and Topics displayed, click the **down arrow** next to Account Management and select **Remove from Agent**.  
    
10.  Repeat the same task for the following topics: **Case Management**, **Reservation Management**, **Delivery Issues**, **Order Inquiries**, and **Escalation**.  
    Note: The General FAQ topic should be the only remaining topic.  
    

### Add Custom Topics and Actions

Topics and actions can be created and customized using Agent Builder. Note: It’s not recommended to use the standard query and summarization actions with a public facing agent, so instead use custom actions to interact with the data.

1.  From the Agent Builder, click **New** and select **New Topic**. Note: If the New button does not appear, return to the agent setup page and toggle the Agentforce toggle to off, then back to on again.  
    

![“”](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/ef847b8b77445601217e94fb9d68905d_kix.63yajwkgvcna.png)

2.  In the modal, configure the Start element as follows:  
    



* Field: Topic Label
  * Value: Experience Management
* Field: Classification Description
  * Value: This topic addresses customer inquiries and issues related to booking experiences at Coral Cloud Resorts, including making reservations, modifying bookings, and answering queries about experience details.
* Field: Scope
  * Value: The agent's job is to assist users in navigating and managing bookings for different experiences offered by Coral Cloud Resorts, ensuring a seamless customer service experience by providing accurate information and resolving issues promptly.


3.  At the bottom, click **Add Instructions five (5) times**. There will now be six blank instruction text boxes.  
    
4.  Add these Instructions:  
    



* Field: 1st Instruction
  * Value: If a customer would like more information on Activities or Experiences, you should run the action 'Get Experience Details' and then summarize the results with improved readability. Always ensure you know the customer before running this action.
* Field: 2nd Instruction
  * Value: If the customer is not known, you must always ask for their email address and their membership number to get their Contact record by running the action 'Get Customer Details' before running any other actions.
* Field: 3rd Instruction
  * Value: Whenever a date is provided, convert the date to YYYY-MM-DD format and ensure that the date is not in the past before using it for the 'Get Sessions' action. If a past date is provided, explain to the client the date must be future.
* Field: 4th Instruction
  * Value: If asked to get sessions for the experience use the 'Get Sessions' action. Ask for the Date of the sessions if not provided. Use the Id of the Experience__c from the 'Get Experience Details'. Do not use the experience name, this must be an ID.
* Field: 5th Instruction
  * Value: If asked to book, use the action 'Create Booking'. The Contact__c is the contact ID from the 'Get Customer Details'. The Session__c is the ID of the session from the action 'Get Sessions'. If multiple sessions are present, ask to select one of the sessions and use that Session as the ID for the Session__c. Prompt for the Number of Guests and use that for the Number_of_Guests__c.
* Field: 6th Instruction
  * Value: If asked to recommend experiences that a user might be interested in, use the 'Generate Personalized Schedule' Action to generate a schedule based on a contacts interests. Use the contact record from 'Get Customer Details' and pass it into the Contact input.


5.  Leave everything else as is and click **Next**.  
    
6.  Custom actions will be added to this topic so skip adding any of the standard actions and click **Finish**.  
    

### Add the Get Experience Details Action to the Agent

Create and attach the Get Experience Details action to the Experience Management topic so the agent can produce details about each experience.

1.  Click the **Experience Management** topic.  
    
2.  Click the **This Topic’s Actions** tab.  
    

![This Topic’s Actions tab highlighted.](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/2b2b43f62040c6a39a669ff9ad68c99a_kix.477i2hs7ibp3.png)

3.  Click **New** and select **Create New Action**.  
    
4.  Select **Flow** as the Reference Action Type.  
    
5.  For Reference Action, select **Get Experience Details**.  
    
6.  Leave the other options as is, and click **Next**.  
    
7.  Uncheck the box labeled **Show loading text for this action**.  
    
8.  For experienceName, check **Require Input**.  
    
9.  For experienceRecord, check **Show in conversation**.  
    

![A configured action for agent with designated checkboxes checked.](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/e7505f7ce4355b356efab5b340974184_kix.4ohqcw6gs2mf.png)

9.  Click **Finish**. Note: If the API name is already in use error appears, it is because this action has already been created. Return to the New Action button and select Add from Asset Library.  
    

### Add an Action to Validate Customer Details

For security purposes, the agent needs to validate that the customer is who they say they are. In this case, the agent validates key contact details such as email and membership number.

1.  With the This Topic’s Actions subtab still selected, click **New** and select **Create New Action**.  
    
2.  Select **Flow** as the Reference Action Type.  
    
3.  For Reference Action, select **Get Customer Details**.  
    
4.  Leave the other options as is, and click **Next**.  
    
5.  Uncheck the box labeled **Show loading text for this action**.  
    
6.  For email, check **Require Input**.  
    
7.  For memberNumber, check **Require Input**.  
    
8.  For contact, check **Show in conversation**.  
    
9.  Click **Finish**.  
    

### Add an Action to Get Session Records

Use the Get Sessions flow to get the available session records for each experience.

1.  With the This Topic’s Actions subtab still selected, click **New** and select **Create New Action**.  
    
2.  Select **Flow** as the Reference Action Type.  
    
3.  For Reference Action, select **Get Sessions**.  
    
4.  Leave the other options as is, and click **Next**.  
    
5.  Uncheck the box labeled **Show loading text for this action**.  
    
6.  For experienceId, check **Require Input**.  
    
7.  For startDate, check **Require Input**.  
    
8.  For sessions, check **Show in conversation**.  
    
9.  Click **Finish**.  
    

### Add an Action to Generate a Personalized Schedule

The agent needs to be able to give personalized recommendations based on the current contact’s schedule. The client shouldn’t get a recommendation for jet skiing if they already have that experience booked.

1.  With the This Topic’s Actions subtab still selected, click **New** and select **Create New Action**.  
    
2.  Select **Prompt Template** as the Reference Action Type.  
    
3.  For Reference Action, select **Generate Personalized Schedule**.  
    
4.  Leave the other options as is and click **Next**.  
    
5.  Configure the agent action as follows:  
    



* Field: Agent Action Instructions
  * Value: Generate a personalized schedule that includes the time and location of resort experiences that are available today, and that match the guest's interests.
* Field: Show loading text for this action
  * Value: [uncheck]
* Field: Contact Input Instructions
  * Value: Contact for which the personalized schedule should be generated. Must be a valid JSON representing the contact info, chained from having executed the Get Customer Details action.


6.  For the Prompt Response Output, check **Show in conversation**.  
    
7.  Click **Finish**.  
    

### Add an Action to Create a Booking

When the agent provides excellent recommendations and the client wants to book an experience, what should happen? Hint, the agent will create a new record within Salesforce.

1.  Click **New** and select **Create New Action**.  
    
2.  Select **Flow** as the Reference Action Type.  
    
3.  For Reference Action, select **Create Experience Session Booking**.  
    
4.  Leave the other options as is, and click **Next**.  
    
5.  Uncheck the box labeled **Show loading text for this action**.  
    
6.  For Contact\_Id, check **Require Input**.  
    
7.  For Guests, check **Require Input** and **Collect data from user**.  
    
8.  For Session\_Id, check **Require Input**.  
    
9.  For Booking output, check **Show in conversation**.  
    
10.  For Output\_Message output, check **Show in conversation**.  
    
11.  Click **Finish**.  
    
12.  Click **Activate**.  
    

![“”](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/3d7dfd2b4300c6957631fb48c3e8b882_kix.ra9drb7ufyrp.png)

Test the Agent
--------------

Start a conversation to preview how your agent builds a plan and executes actions based on user interactions. As interactions happen with the agent, notice the panel in the middle of the screen that displays exactly what the agent is executing.

1.  While still in the Agent Builder, click **Refresh** (circular arrow) in the top right corner of the **Conversation Preview**.  
    

![The Conversation Preview window](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/c977728aedffa698ca3e074a724b16c1_kix.9bmba2xb9zq0.png)

2.  Don't worry if the dots are spinning in the Conversation Preview, go ahead and enter this prompt: `Can you let me know more about the full moon beach party experience?` and press your **Return/Enter** key.  
    
3.  After the agent responds, enter the next prompt: `I am sofiarodriguez@example.com and my membership number is 10008155`. Press your **Return/Enter** key. Keep answering the agent’s questions and book a session.  
    
4.  Click the **back arrow** to return to Setup.  
    

![Highlighted back arrow to get back to Setup.](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/598d50d97e21c55b89261944422768c3_kix.hgyisl1btqlr.png)

Publish and Update
------------------

Publish the web deployment and update the flow.

1.  In the Setup Quick Find, search for and select **Embedded Service Deployments**.  
    
2.  Select the **ESA Web Deployment**.  
    
3.  Click **Publish** to republish with the latest additions. Note: The deployment can take up to 10 minutes but no need to wait, proceed to the next step.  
    

### Re-route the Flow

Now update the existing flow to route work to the newly created service agent.

1.  In the Setup Quick Find, search for and select **Flows**.  
    
2.  Click on the **Route to ESA** flow.  
    
3.  Click the **Route to ESA** component ![Route to ESA component](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/0a919cc3859cdbc61148f253e2273b0a_kix.5rke2ayf0kdq.png) and select **Edit Element**.  
    
4.  Select these values in the Set Input Values section:  
    



* Field: Route To
  * Value: Agentforce Service Agent
* Field: Agentforce Service Agent
  * Value: CC Service Agent
* Field: Note: If CC Service Agent doesn’t show up as an option, return to Agent Builder for the CC Service Agent and make sure it’s activated.
  * Value: 


5.  Click **Save As New Version**.  
    
6.  Keep everything as is and click **Save**.  
    
7.  Click **Activate**.  
    
8.  Click the **back arrow** to return to Setup.  
    

![Back arrow highlighted in the Flow Builder.](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/522c183ed1a65772753d1e332da96dc5_kix.50g0xgn4ulh.png)

Add the Agent to the Coral Cloud Site
-------------------------------------

Lastly, embed the chat component to the Coral Cloud Experience Cloud site.

1.  In the Setup Quick Find, search and select **All Sites**.  
    
2.  Click **Builder** next to the coral-cloud site.  
    
3.  Click the **Components** widget ![Components widget](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/646a7d897ce31b88c2e29976be22de2e_kix.hcrl26lyw2hz.png) .  
    
4.  Search **Embedded Messaging** and drag and drop the component over the Book an Experience of a Lifetime section. Note: exact placement is up to you, and it may take a few seconds for the component to appear.  
    

![Embedded Messaging added to the Experience Cloud site.](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/f589f9f8913e2d015fa3c062bb91306d_kix.2sben558eyau.png)

5.  Leave the default settings.  
    
6.  Click **Publish** in the upper right corner.  
    
7.  Click **Publish** in the confirmation window.  
    
8.  Click **Got It**.  
    

### View the Agent as a Customer

The big reveal. Time to interact with the new agent.

1.  Click the **Experience Builder menu** ![Experience Builder menu icon](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/23eb521e0176abf28d2566620ec862ed_kix.sicd349dg5my.png) .  
    
2.  Select **View coral-cloud** to open the published coral cloud site. Note: It may take a few minutes for the site to publish. Go ahead and verify the challenge below while you wait for your Experience Cloud site to publish.  
    
3.  Click on the **Messaging icon** ![messaging icon](https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/projects/quick-start-build-your-first-agent-with-agentforce/configure-an-agentforce-service-agent/images/45861c7f0a98c7916959563a0a3d4cf7_kix.yhmy2hpxxkrv.png) in the lower right corner to start interacting with the new agent. Wait for the agent to say hi and then try out the following prompt:  
    

*   `Can you let me know about the Underground Cave Exploration?`
*   Reminder: `sofiarodriguez@example.com and my membership number is 10008155.`  
    
*   Keep answering the agent’s questions and book a session.  
    

Coral Cloud Resorts now has a shiny new service agent that can not only give personalized experience recommendations, but also book experiences for clients. Bring on the busy season!

Resources
---------

*   [_Trailhead_: Agentforce for Service](https://trailhead.salesforce.com/content/learn/modules/agentforce-service-agent-quick-look)
*   [_Salesforce Help_: Configure Service Agent Managers](https://help.salesforce.com/s/articleView?id=sf.configure_service_agent_managers.htm&type=5)
*   [_Salesforce Help_: Escalate Conversations to a Service Rep](https://help.salesforce.com/s/articleView?id=service.service_agent_escalation.htm&type=5)
*   [_Website_: Salesforce AI Use Case Library](https://www.salesforce.com/artificial-intelligence/use-cases/)
*   [_Salesforce Developer Documentation_: Get Started with Agents](https://developer.salesforce.com/docs/einstein/genai/guide/get-started-copilot.html)
*   [_Salesforce Developers Blog_: Build Custom Actions Using Apex](https://developer.salesforce.com/blogs/2024/03/build-custom-copilot-actions-using-apex)
