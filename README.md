# Webcomponents

I've decided to implement a webcomponent library on top of React (TypeScript), so people can see that is possible to generate something that can be injected into any javascript frameworks (if it is JS based, it should work).

## Technologies involved

For the frontend:
* Vite
* React 18
* Typescript
* JSON Server mocking RestFul API, so we can make calls to the endpoints

Note: Even though it is frontend related, I didn't focus on the FE side of it, as the purpose was to create a simple webcomponent using React and inject it into the Vue 3 project.

## Setting Up & starting the webcomponents/json server applications

For the frontend, please guarantee you have node 20+ installed on your machine.

Please access the `react-webcomponents` folder, which is the project that generates the webcomponents to us.
Run `yarn install`
Run `yarn run dev`
  This command should start the react project (PORT=5173) and the json server (PORT=5174)
  Frontend: http://localhost:5173/
  JSON Server: http://localhost:5174/

  ![image](https://github.com/user-attachments/assets/fd175d5e-dff7-4aed-a94b-798452519886)
  ![image](https://github.com/user-attachments/assets/e3e99f3d-d848-4793-afd2-18b68f22c0ff)
