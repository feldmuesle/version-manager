# Tactile React Interview Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It uses MUI as underlying component library with a customized theme and styled-components to tweak the styling.
The scope for component functionality and custom theme is restricted to only achieve the requirements but can be extended.

The main component is the VersionsEditor, which allows the user to add, update and delete production versions as well as test versions. In order to handle both types of versions, I took the liberty to deviate from the design shown in the specs video and added an additional button for adding test versions.
The same could have been achieved by adding a checkbox to the form, but I tried to manage the issue with a minimum of components.

Although this is just a little project without any API, in a real case scenario the versions would likely come from the server instead of being held in a local state. To separate these concerns, the component is using a hook to manage the data, which could be extended to perform api calls to the backend.

As the main focus has been the VersionsEditor, I haven't added thorough testing to all components, but focused mainly on testing the VersionsEditor as well as it's underlying hook.

![tactile](https://github.com/feldmuesle/versions-component/assets/7722503/223c6b21-071c-47d5-98e0-dd3c8198e8a6)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
