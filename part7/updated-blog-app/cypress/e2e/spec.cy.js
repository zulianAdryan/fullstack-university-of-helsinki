describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Zulian Adryan",
      username: "zulian",
      password: "123",
    };
    const mock = {
      name: "Root",
      username: "root",
      password: "123",
    };
    cy.register(user);
    cy.register(mock);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Login to application");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("zulian");
      cy.get("#password").type("123");
      cy.get("#login-button").click();

      cy.contains("Zulian Adryan logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("zulian");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").contains("Invalid user or password");
      cy.get(".error")
        .should("contain", "Invalid user or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Zulian Adryan logged in");
      cy.contains("Zulian Adryan logged in").should("not.exist");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "zulian", password: "123" });
    });

    it("a blog can be created", function () {
      cy.createBlog({ title: "a blog created by cypress", url: "someurl1" });
    });

    it("confirms users can like a blog", function () {
      cy.createBlog({ title: "a blog to be liked", url: "someurl2" });
      cy.request("GET", `${Cypress.env("BACKEND")}/blogs`).then(({ body }) => {
        const data = body;
        const targetBlog = data.find(
          ({ title }) => title === "a blog to be liked"
        );
        // console.log("target blog: ", targetBlog);
        cy.likeBlog({ ...targetBlog, likes: targetBlog.likes + 1 });
      });
    });

    it("only the user who created the blog can delete it", function () {
      cy.createBlog({ title: "a blog to be deleted", url: "someurl3" });
      cy.request("GET", `${Cypress.env("BACKEND")}/blogs`).then(({ body }) => {
        const data = body;
        const targetBlog = data.find(
          ({ title }) => title === "a blog to be deleted"
        );
        // console.log("target blog: ", targetBlog);
        cy.deleteBlog(targetBlog.id);
      });

      cy.contains("a blog to be deleted").should("not.exist");
    });

    describe("only the user who created the blog who can see the delete button", function () {
      beforeEach(function () {
        cy.login({ username: "zulian", password: "123" });
        cy.createBlog({
          title: "only me who can see the delete button",
          url: "someurl4",
        });
      });

      it("remove button exist", function () {
        cy.get(".blog")
          .contains("only me who can see the delete button")
          .parent()
          .parent()
          .contains("view")
          .click();

        cy.get(".blog")
          .contains("only me who can see the delete button")
          .parent()
          .parent()
          .should("contain", "remove");
      });

      it("remove button does not exist", function () {
        cy.login({ username: "root", password: "123" });
        cy.get(".blog")
          .contains("only me who can see the delete button")
          .parent()
          .parent()
          .contains("view")
          .click();

        cy.get(".blog")
          .contains("only me who can see the delete button")
          .parent()
          .parent()
          .contains("remove")
          .should("not.exist");
      });
    });

    it("blogs are ordered according to likes with the blog with the most likes being first.", function () {
      const newBlogs = [
        {
          title: "blog with the most likes",
          url: "first",
          likes: 15,
        },
        {
          title: "blog with the second most likes",
          url: "second",
          likes: 9,
        },
        {
          title: "blog with the least likes",
          url: "third",
          likes: 7,
        },
      ];
      cy.createBlog(newBlogs[2]);
      cy.createBlog(newBlogs[0]);
      cy.createBlog(newBlogs[1]);

      cy.get(".blog").then((blogs) => {
        // console.log("blogs length", blogs.length);
        for (let i = 0; i < blogs.length; i++) {
          cy.get(".blog").eq(i).contains("view").click();
          cy.get(".blog").eq(i).should("contain", newBlogs[i].title);
        }
      });
    });
  });
});
