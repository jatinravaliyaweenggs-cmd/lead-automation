Feature: Dashbroad Estimate Creation

  Background:
    Given User is on the login page
    When User login with valid credentials

  Scenario: Recent Client Responses Block

    When User navigates to Estimate page

    And Verify estimate in Recent Client Responses block visible
    And Verify estimate in Recent Client Responses block column visible
    And Verify estimate in Recent Client Responses block status visible
    Then Verify estimate title after click on estimate link and verify title
    Then Click customer profile for estimate "This is a testing title"