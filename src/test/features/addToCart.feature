Feature: Add Book To Cart

  Background: 
    Given User navigates to the application
    When User click on the login link

  Scenario: Add a book to cart successfully
    When User enters the username as "janedoee"
    And User enters the password as "Password@123"
    And User clicks on the login button
    Then User is logged in successfully
    When User search for "HP2" book
    And User click on Add to cart button
    Then Cart badge should get updated
