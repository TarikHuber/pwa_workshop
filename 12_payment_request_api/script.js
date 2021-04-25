const butPay = document.getElementById("butPay");

function buildSupportedPaymentMethodData() {
  // Example supported payment methods:
  return [
    {
      supportedMethods: "basic-card",
      data: {
        supportedNetworks: ["visa", "mastercard"],
        supportedTypes: ["debit", "credit"],
      },
    },
  ];
}

function buildShoppingCartDetails() {
  // Hardcoded for demo purposes:
  return {
    id: "order-123",
    displayItems: [
      {
        label: "Example item",
        amount: { currency: "USD", value: "1.00" },
      },
    ],
    total: {
      label: "Total",
      amount: { currency: "USD", value: "1.00" },
    },
  };
}

butPay.addEventListener("click", () => {
  if (false && window.PaymentRequest) {
    var request = new PaymentRequest(
      buildSupportedPaymentMethodData(),
      buildShoppingCartDetails()
    );

    request.show().then(function (paymentResponse) {
      // Here we would process the payment. For this demo, simulate immediate success:
      paymentResponse.complete("success").then(function () {
        // For demo purposes:
        introPanel.style.display = "none";
        successPanel.style.display = "block";
      });
    });
  } else {
    //Redirect to classic form
  }
});
