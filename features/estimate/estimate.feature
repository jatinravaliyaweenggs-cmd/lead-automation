Feature: Estimate Creation

  Background:
    Given User is on the login page
    When User login with valid credentials
    #Then User should be redirected to the dashboard

  # Scenario: Create a new Estimate
  #   When User navigates to Estimate page
  #   And User creates a new Estimate

  # Scenario: estimate deails add
  #   When User navigates to Estimate page
  #   When User open estimate and enter details

    Scenario: user enter items detail
    When User navigates to Estimate page
    When User open enter item
    When user enter new section
    Then User import estimate from template