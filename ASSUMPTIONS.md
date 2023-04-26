# Assumptions

## Phase 1

- We are allowed to use 3rd party fonts.
- We use the terminology artist-albums page, album-songs page and list of artists page
  instead of the one given in instruction to avoid confusion.
- We have a few extra artists featured that don't have atleast 5 albums. Some of these ablums don't have 5 songs either. However, we have made sure to feature the first 5 artists with atleast 5 albums as per requirement, and each of these albums have atleast 5 songs.

## Phase 2

- To do the scaling animation, we can use CSS.
- In the requirement "Use radio buttons for review input", we used radio buttons styled as stars.
For this we have taken reference from [here](https://scottaohara.github.io/a11y_styled_form_controls/src/radio-button--rating/).
- While displaying the top 10 search results, if adding filters reduces the number of records, we do not query for more results to maintain 10 records. This is done to not abuse the API endpoint with extra requests.
- Because this phase has no backend components, we have not implemented any user input validation/sanitization for XSS attacks (injection of HTML or JS code) on our reviews page. Though this can be done in JS, client-side validation is ineffective as it can be trivially removed.