# The Recipe for Your LeftOver

- A web application written by React and using Firebase functions
- All data comes from the FakeStore API
- [App runs here]()

---

### What its can do ?

---

### Future Development

- Process to Pay with user information (address / phone / etc.)
- Integrate with Stripe for payment
- Implement PWA

---

### For local run

1. Clone this repository
2. Create a project on [Firebase console](https://console.firebase.google.com/), enable Login methods: Email, Google and Facebook (if using)
3. Create a web application and follow the step
4. Back to repository and create an .env file on root with filling variables

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_PROJECT_ID=
REACT_APP_APP_ID=
REACT_APP_DATABASE_URL=
REACT_APP_API_KEY=
```

5. For the field `REACT_APP_API_KEY`, go to [RapidAPI](https://rapidapi.com/thecocktaildb/api/themealdb/) to create an app and register for an application.
6. Get started with running command in terminal : `npm start`
