# final-boiler-plate

This template should help get you started developing the final project running on Vue 3 with the composition API, Pinia as a state management tool, vue router, vite and lastly Supabase running on the backend.

This is meant as an advanced starter ready to plug in your supabase variables and run directly on a local server already connected to your Supabase instance.

You are given some functions to see how the supabase ecosystem works with Vue and more specifically, pinia as a state management tool.

You can add any CSS framework of your liking like tailwindCSS, Bootstrap, MaterialUI or many of the cool libaries that exist in the web.

## Important

This app is not setUp to be deployed to a production environment like vercel or netlify.

## Project Setup

```sh
npm install
```

## Set Up your Environment Variables from Supabase located at the root folder of the project

```sh
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

#### Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Good Music is always key!

```sh
Wu Tang Clan
A tribe called quest
Kendrick Lamar
Outkast
Dr. Dre
N.W.A
De La Soul
Ms. Lauryn Hill
J. Cole
Guts
Naughty By Nature
People under the stairs
Nujabes
NAS
KRS-One
The Pharcyde
Jurassic 5
Gang starr
Jay Z
Mobb Depp
Common
Lil Supa
```

[Hip Hop Spotify Playlist](https://open.spotify.com/playlist/4vKftyhS1gQovakehVcq1u?si=a7a119382dfe40da)

## The log of the project

### Day 1

- Setup project and install tailwindCSS
- Start planning the tasks to do and the design to have a real guide to follow to create the app

### Day 2

- Spent the day designing the app (login/sign up and dashboard) in Figma and completed it! (theoretically)
- Started to work on the Sign In component
  ---- For tomorrow: I want to finish (finish finish, I mean, with all functionality and design) the Sing In component and the Sign Up component

## Day 3

- Finished the styling of Sign Up and Sign In components, responsive.
- Started working on the Nav component of the Home/Dashboard.
  ---- For tomorrow: Want to finish the NewTask component and TaskItem (without the edits)

## Day 4

- Done with the styling and logic of NewTask and the Nav component
- Started with the Home view: fetch the tasks and upload the dashboard everytime a task is added.
  ---- For tomorrow: Want to finish the Home view, and start with the TaskItem component, showing the correct content.

## Day 5

- Add all tasks inside dashboard, with correct styling & responsive
- Show tasks in separate sections depending on completion (completed above). But I'll iterate over the functionalities and maybe filter the tasks if user wwants it.
- Still have pending the edit functionality of the taskItem component.
  ---- For next day: Want to finish the edit functionality and want to think about new features for the app. And also adapt everything following the responsive design.

## Day 6

- Finished the edit task functionality
- Thought about new functionalities to add: add priority to tasks, filter by entered date, show the tasks in different formats...
  ---- For next day: Want to apply this functionalities

## Day 7

- Add toggle to view tasks with list or columns
- Edit the errors to show notifications
- Add validation on edit task to avoid an empty title
- Add toTop button when scrolling
  ---- For next day: Want to add/create logic to tasks to have priority and a filter of priority and the filter of entered_at (when the task was created)

## Day 8

- Add toggle to order tasks by priority or date.
- Add priority to tasks (badge styled with text and color depending on priority)
- Refactor user preferences styling
- Refactor function to updateTask
  ---- For next day: Want fo finally add two filters: to see just tasks with one priority, or from one date, and a check to show completed tasks or not.

## Day 8

- Add filters by date or priority to see just tasks from one day (from the days that have created tasks) or one concrete priority.
- Final styling and refactor of some components.
  --- Finish but not finish! :)
