$(function () {
  // On form submit
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();

    // Get form values
    var name = $("input#name").val();
    var email = $("input#email").val();
    var subject = $("input#subject").val();
    var message = $("textarea#message").val();

    // Validate form fields
    if (!name || !email || !subject || !message) {
      // Display error if any field is empty
      $("#success").html("<div class='alert alert-danger'>");
      $("#success > .alert-danger")
        .html(
          "<button type='button' class='close' data-bs-dismiss='alert' aria-hidden='true'>&times;</button>"
        )
        .append(
          "<strong>All fields are required. Please fill in the form completely.</strong>"
        )
        .append("</div>");
      return;
    }

    // Disable submit button to prevent multiple submissions
    var $this = $("#sendMessageButton");
    $this.prop("disabled", true);

    // Perform AJAX request
    $.ajax({
      url: "contact.php",
      type: "POST",
      data: {
        name: name,
        email: email,
        subject: subject,
        message: message,
      },
      cache: false,
      success: function () {
        // Display success message
        $("#success").html("<div class='alert alert-success'>");
        $("#success > .alert-success")
          .html(
            "<button type='button' class='close' data-bs-dismiss='alert' aria-hidden='true'>&times;</button>"
          )
          .append("<strong>Your message has been sent. </strong>")
          .append("</div>");
        $("#contactForm").trigger("reset"); // Reset form
      },
      error: function () {
        // Display error message
        $("#success").html("<div class='alert alert-danger'>");
        $("#success > .alert-danger")
          .html(
            "<button type='button' class='close' data-bs-dismiss='alert' aria-hidden='true'>&times;</button>"
          )
          .append(
            "<strong>Sorry " +
              name +
              ", it seems that our mail server is not responding. Please try again later!</strong>"
          )
          .append("</div>");
        $("#contactForm").trigger("reset"); // Reset form
      },
      complete: function () {
        // Re-enable submit button after 1 second
        setTimeout(function () {
          $this.prop("disabled", false);
        }, 1000);
      },
    });
  });

  // Clear success/error messages on focus
  $("#name").focus(function () {
    $("#success").html("");
  });
});
