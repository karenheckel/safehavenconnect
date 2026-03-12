AI Report - IDB1
Summary of AI Interactions
    Tools: 
        ChatGPT

    Debugging help: 
        While creating the array for commit IDs to dynamically derive the commit
        stats, the website would not load the data. ChatGPT helped point out that
        the names to traverse the array did not match the name of the array for each
        team member. Correcting the array name fixed the issue.

    Conceptual clarification (CS concept, syntax, algorithm idea)
        ChatGPT explained Postman and how to use a workspace to manage API endpoints.
        ChatGPT also clarified Git SHA and its relevance to commit tracking.

    Code improvement (style, efficiency, readability, testing)
        I used AI when my instance pages weren’t linking correctly. ChatGPT
        helped me realize that I needed to update App.js to include the proper
        routes, which fixed the navigation issues.

    Alternative approaches (asking “is there a simpler way?”)
        ChatGPT suggested that instead of fetching issues twice (once for
        created and once for closed), I could fetch all issues just once and
        then filter the same dataset to count both created and closed issues
        per member. This approach was simpler, reduced redundant API calls,
        and made the code more efficient.

Reflection on Use
    What specific improvements to your code or understanding came from this
    AI interaction?
        One issue I had was commits coming from different aliases for each
        member due to their name changing. The original way I had it disregarded
        a few commits for a team member due to a slight variation in their
        GitLab name. AI suggested creating an array to hold the different
        aliases and to loop through them per team member to properly account
        for each commit. 
    
    How did you decide what to keep or ignore from the AI’s suggestions?
        I decided to keep the AI suggestions that helped the accuracy of the
        website, like iterating over an array of aliases and encoding commit IDs
        for the API request to capture the data accurately. I ignored suggestions
        that were unnecessary for the repository, such as authentication tokens.  
    
    Did the AI ever produce an incorrect or misleading suggestion? How did you detect that?
        When I asked ChatGPT about what it means to get data dynamically from
        GitLab, it mentioned needing an access token to be able to get the data.
        However, I realized that authentication only applies to private
        repositories, and ours is public so that was not necessary. After
        implementing it without a token, the API returned the commit and issue
        data successfully showing that an access token is not required.

Evidence of Independent Work
    Paste a before-and-after snippet (3–5 lines max) showing where you changed
    your own code in response to AI guidance.
        Before: https://gitlab.com/api/v4/projects/${projectId}/repository/commits
        ?per_page=${perPage}&page=${page}&author=${commitId}

        After: https://gitlab.com/api/v4/projects/${projectId}/repository/commits
        ?per_page=${perPage}&page=${page}&author=${encodeURIComponent(commitId)}
    
    In 2–3 sentences, explain what you learned by making this change.
        By adding encodeURIComponent(commitId), I learned that URLs must be
        properly encoded to handle special characters like spaces, symbols,
        or email addresses. Without encoding, the API request can fail or return
        unexpected results because the server misinterprets the URL.
        
Integrity Statement
    I confirm that the AI was used only as a helper (explainer, debugger, reviewer)
    and not as a code generator. All code submitted is my own work.