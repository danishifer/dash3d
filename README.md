# **3D Printing Dashboard**

## Abstract

Rimon Middle School has a 3D printing course and a 3D printer. Students of several classes take the 3D printing course. Teachers give modeling and printing assignments to the students. Students are creating 3D models using their favourite modeling software and export them to a universal STL file for reviewing or for printing. Printing is handled by transferring the STL file to the 3D printer by printer managers.

The objective of the 3D Printing Dashboard is to provide a secured and easy-to-use management tool for teachers, printer managers and students to manage the 3D prints.

## Schedule

MVP - Q2 2018

## Yearly Setup

In the beggining of each school year teachers should setup the following:

1. Create an entry for the coming school year with it's start and end date

   + **Example:** "2017 - 2018", Starting 09/01/2017, Ending 06/20/2018

     ​

2. In the coming year entry, create an entry for each class the will be taking the 3D printing course

   + **Example:** "8th Grade - Class 6"

     ​

3. In each class entry, create an entry for each group of students

   + **Example:** "Group A"

---

### Accounts

Students need to create an account specifying their name and email.

When an account is created it's in the *Pending Activation* state.

Teachers should activate students' accounts by assigning them to a group within a class within a year.

Once the school year ends, students' accounts will automatically switch to the *Pending Activation* state to be activated again next year.

#### Account States

- *Pending Activation*
- *Activated*

----

## Usage

Teachers create individual or team modeling assigments for reviewing or printing. An assigment has a due date, and is attached to a group within a class within a year.

Students fulfill their assigments by creating a 3D model and submitting a print. When fulfilling team assigments the student that creates the print can add other students to participate in the assignement.

Printer managers monitor the dashboard print queue and the printer status and pick the next print to be sent to the printer.

Teachers review the submitted STL files and the prints.

## Model

### Assignment

An assignment has the following attributes:

* Course name
* Description
* Individual or team submission
* For printing or reviewing only
* Due date

#### Assignment States

* *Active*
* *Overdue*

---

### Print

A print is created to fulfill an assignment. It contains a STL file and a description.

A print cannot be submitted in case the assigment is overdue.

A print's initial state is *Pending*.

#### Print States

- *Pending*
- *Printing*
- *Done*

----

### Queueing Process

Printer managers monitor the dashboard print queue and the printer status.

Once the printer is free to print, a printer manager can download a pending print's STL file and copy it to the slicing software.

The printer manager then enters the print time and the amount of fillament used in the print's adittional info set's the print state to *Printing*.

Once the print ends a printer manager should set that print's state to *Done*.

---

### Roles

* Student
  - Create a print to fulfill an assignment

  - Update / delete a print while in *Pending* state

    ​

* Printer Manager
  - Create / update / delete print requests for ad-hoc assignments *(Nice to have)*

  - Update the print queue

  - **All student actions**

    ​

* Teacher

  * Create / update / delete years, classes and groups
  * Create / update / delete assignments
  * Activate / update / delete accounts
  * Assign roles to other users
  * Delete print requests
  * **All printer manager actions**

## Security

* All client-server communications are over HTTPS
* Using Firebase authentication module for users authentication, all client requests contains an auth token that is inspected on the server to verify the user idendity and it's role
* Dashboard pages are dynamically served to clients based on their role

## UI

### Sign Up Form

* First Name
* Last Name
* E-mail
* Password (At least 6 chars)
* Password Validation

---

### Login Form

* E-mail
* Password
* Forgot Password? *(Nice to have)*

---

### Tabs

#### My Prints - **Visible to users**

* User can create a print request
* User sees list of his prints with their state
* User sees estimation for the print request's print time *(Nice to have)*

#### My Account - **Visible to users** *(Nice to have)*

* User sees his account details
* User can update his login information
* User can change his password
* User sees his prints statistics

#### Assignments - **Visible to print managers**

+ Print manager sees a list of all the assignments and execute print manager actions on them.

#### Queue - **Visible to print managers**

* Table with all print requests grouped by assignments ordered by their due date, then ordered by print request submission date
* Set print request state
* Download a print request's STL file

#### Accounts - **Visible to admin**

* Admins can assign roles to users




## Implementation

### Technologies

Cloud application. Powered by [Google Firebase](firebase.google.com)

---

### Source Control

Project will be managed in [Gitlab](www.gitlab.com)

---

### Dev Tools

* [Facebook React](https://reactjs.org)
* [Semantic UI React](https://react.semantic-ui.com/)
* [Github Atom](atom.io)
* [Adobe Brakcets](https://brackets.io)

---

### License

All rights reserved to the developer.






### Additions

* Printer managers need to input the amount of fillament used in each print.
* Account states
* What the user sees when account is not yet activated.
* What happens next year?
* Team assignments