Feature: Estimate Creation

  Background:
    Given User is on the login page
    When User login with valid credentials
    #Then User should be redirected to the dashboard

  Scenario: Create a new Estimate
    When User navigates to Estimate page
    And User creates a new Estimate

 # Scenario: estimate deails add
 #   When User navigates to Estimate page
 #   When User open estimate and enter details

#  Scenario: user enter items detail
#    When User navigates to Estimate page
#    When User open enter item
#    When user enter new section
#    Then User import estimate from template

    Scenario: manual item add
   When User navigates to Estimate page and open estimate
    When user enter manual item

    #Scenario: home depot
   #When User navigates to Estimate page and open estimate
    #When User select Home Depot item from Home Depot page


     Scenario: material add 
   When User navigates to Estimate page and open estimate
   When User enter material from material tab

  Scenario: labor add 
   When User navigates to Estimate page and open estimate
   When User enter labor from labor tab

     Scenario: Equipment add 
   When User navigates to Estimate page and open estimate
   When User enter equipment from equipment tab

  Scenario: subcontractor add 
   When User navigates to Estimate page and open estimate
   When User enter subcontractor from subcontractor tab


   Scenario: other item add 
   When User navigates to Estimate page and open estimate
   When User enter other item from other item tab