Feature: Change Orders
  Background:
    Given User is on the login page
    When User login with valid credentials


  Scenario: Open Change Orders page
    When user opens the Change Orders page
    Then Change Orders page should be displayed