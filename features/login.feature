@login
Feature: Login
  As a user want to login to CFTeam application

  Scenario Outline: Login with valid credentials
    Given User is on the login page
    When User login with "<username>" and "<password>"
    Then User should be redirected to the dashboard

    Examples:
      | username                    | password            |
      | jatin.ravaliya@weenggs.in   | 1234567890aABCD@#   |
