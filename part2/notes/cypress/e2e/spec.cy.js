describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Zulian Adryan",
      username: "zulian",
      password: "123",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#username").type("zulian");
    cy.get("#password").type("123");
    cy.get("#login-button").click();

    cy.contains("Zulian Adryan logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("zulian");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error").contains("Wrong credentials");
    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Zulian Adryan logged in");
    cy.contains("Zulian Adryan logged in").should("not.exist");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "zulian", password: "123" });
    });

    it("a new note can be created", function () {
      cy.get("#new-note-toggle").click();
      cy.get("#new-note-input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: true,
        });
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("another note cypress").contains("make important");
      });
    });

    describe("when logged in", function () {
      describe("and several notes exist", function () {
        beforeEach(function () {
          cy.login({ username: "zulian", password: "123" });
          cy.createNote({ content: "first note", important: false });
          cy.createNote({ content: "second note", important: false });
          cy.createNote({ content: "third note", important: false });
        });

        it("one of those can be made important (method 1)", function () {
          cy.contains("second note").contains("make important").click();

          cy.contains("second note").contains("make not important");
        });

        it("one of those can be made important (method 2)", function () {
          cy.contains("second note").parent().find("button").as("theButton");
          cy.get("@theButton").parent().contains("second note").click();
          cy.get("@theButton").parent().should("contain", "make not important");
        });
      });
    });

    it("then example", function () {
      cy.get("button").then((buttons) => {
        console.log("number of buttons", buttons.length);
        cy.wrap(buttons[0]).click();
      });
    });
  });
});
