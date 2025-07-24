# Pagaspot Recruitment Task

## What I did

Started with a calendar component that was using the old moment.js library and had everything crammed into one big file. Since moment.js is pretty much dead and weighs 300KB, I figured it was time for some spring cleaning.

But first, I implemented all the required features from the task:

**Built the calendar functionality**  
Added month/year display with working navigation buttons to switch between months. When you click on any available day, it gets highlighted and shows the selected date below the calendar with an order button. Clicking the order button sends a POST request to the specified endpoint.

**Used consistent color palette**  
Exported theme colors to a separate constants file and used them throughout all components. This makes it super easy to change colors across the entire calendar and keeps everything visually consistent.

**Replaced moment.js with dayjs**  
Swapped out the massive moment.js for dayjs which does the same job but is 150 times smaller. The API is almost identical so the migration was smooth. Added Polish locale support while I was at it.

**Split the calendar into smaller components**  
The main Calendar component was doing way too much. I broke it down into:

- CalendarHeader for the month navigation
- CalendarSelectedDay for showing selected date and order button
- StatusBanner for success/error messages

**Cleaned up the code**  
Removed a bunch of unused styles that were just sitting there. Also got rid of unnecessary imports and made the TypeScript types more consistent.

**Added proper date utilities**  
Created a central dateUtils file that configures dayjs with Polish locale and provides helper functions. Makes the code more maintainable.

## Results

The bundle is much smaller thanks to ditching moment.js. The code is cleaner and easier to understand. Each component has a single responsibility which makes testing and maintenance much easier.

The calendar still works exactly the same from a user perspective, just with much better code under the hood.
