Feature: Dashbroad Estimate Creation

  Background:
    Given User is on the login page
    When User login with valid credentials
    #Then User should be redirected to the dashboard

  Scenario: Recent Client Responses Block
    When User navigates to Estimate page
    #And User creates a new Estimate
    And Verify estimate in Recent Client Responses block