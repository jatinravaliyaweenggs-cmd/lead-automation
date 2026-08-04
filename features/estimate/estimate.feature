Feature: Estimate Creation

  Background:
    Given User is on the login page
    When User login with valid credentials
    #Then User should be redirected to the dashboard

#  Scenario: Create a new Estimate
#    When User navigates to Estimate page
#    And User creates a new Estimate

 # Scenario: estimate deails add
 #   When User navigates to Estimate page
 #   When User open estimate and enter details

#  Scenario: user enter items detail
#    When User navigates to Estimate page
#    When User open enter item
#    When user enter new section
#    Then User import estimate from template

  #  Scenario: manual item add
 #  When User navigates to Estimate page and open estimate
 #   When user enter manual item

  #  #Scenario: home depot
   #When User navigates to Estimate page and open estimate
    #When User select Home Depot item from Home Depot page


  #   Scenario: material add 
  # When User navigates to Estimate page and open estimate
 #  When User enter material from material tab

 # Scenario: labor add 
  # When User navigates to Estimate page and open estimate
  # When User enter labor from labor tab

  #   Scenario: Equipment add 
  # When User navigates to Estimate page and open estimate
  # When User enter equipment from equipment tab

 # Scenario: subcontractor add 
  # When User navigates to Estimate page and open estimate
  # When User enter subcontractor from subcontractor tab


  # Scenario: other item add 
  # When User navigates to Estimate page and open estimate
  # When User enter other item from other item tab


 # Scenario: Update item
 # When User navigates to Estimate page and open estimate
 # When User update View Edit Section Details

 # Scenario: add Apply Automatic/Bulk Markup
 # When User navigates to Estimate page and open estimate
 # When User apply Automatic Bulk Markup

 # Scenario: add Apply Automatic/Bulk Markup
 # When User navigates to Estimate page and open estimate
 # When User update item details and delete item
 # Then User verify hide markup functionality

 #   Scenario: Apply remove tax 
 #   When User navigates to Estimate page and open estimate 
 #   Then User apply and remove tax 

    
 #Scenario: add Apply Automatic/Bulk Markup
 #   When User navigates to Estimate page and open estimate
 #   When User apply bid package

 #Scenario: add Apply Automatic/Bulk Markup
 #  When User navigates to Estimate page and open estimate
 #  When Make item optional

#  Scenario: Apply bulk markup
#    When User navigates to Estimate page and open estimate
#    When user apply markup and verify value

#   Scenario: Copy selected item
#    When User navigates to Estimate page and open estimate
#    When User copy selected items

# Scenario: swap selected item
#    When User navigates to Estimate page and open estimate
#    Then User update tab name

#  Scenario: add scope of details
#     When User navigates to Estimate page and open estimate
#     Then User enter scope of detail

  Scenario: Upload file
     When User navigates to Estimate page and open estimate
     Then Upload files in estimate