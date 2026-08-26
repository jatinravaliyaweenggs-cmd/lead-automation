Feature: Change Orders
    Background:
        Given User is on the login page
        When User login with valid credentials

    # Scenario: Open Change Orders page
    #     When User opens the Change Orders page and verify chnage oder page open
    #     And User click on the create change order button and create chnage order

    # Scenario: Chnage order filter functionality verify
    #     When User opens the Change Orders page and verify chnage oder page open
    #     And User click on filter and verify filter data
    #     And User click on a chnage order button and verify mandatory data

    # Scenario: Chnage order filter functionality verify
    #     When User opens the Change Orders page and verify chnage oder page open
    #     And User click on a chnage order button and verify mandatory data

    # Scenario: Maximum data lenght check for change order
    #     When User opens the Change Orders page and verify chnage oder page open
    #     And User click on the create change order button and verify project name maximum lenght

    # Scenario: Create change order request
    #     When User opens the Change Orders page and verify chnage oder page open
    #     And User click on the create change order request button and create chnage order request
    #     And User verify mandatory fields

    # Scenario: Create change order request
    #     When User opens the Change Orders page and verify chnage oder page open
    #     And Verify maximum project subject lenght for chnage order request

    Scenario: Verify Kanban view functionality
        When User opens the Change Orders page and verify chnage oder page open
        And User verifies the Set as Default View functionality