# quickly-search

[doc file](https://hackmd.io/@qkHgX7jGSCC3bWyVhIsGgQ/rkmei3b_U/edit)

# [Quickly Search Engine](https://warm-scrubland-91667.herokuapp.com/)

###### tags: `engine` `giphy` `gif` `search`
 
 
 :mag:  [Click here to Visit the Heroku website](https://warm-scrubland-91667.herokuapp.com/)
 
 
:::info
 **Mario don't touch our md**
:::

# Table of Contents

- [Goals](#Goals)
- [Introduction](#Introduction)
- [Sketches](#sketches)
- [The Final Product](#The-Final-Product)
- [How it works](#How-it-works)
- [Keynote Features](#Keynote-Features)
- [Backend Requesets Documentation](#Backend-Requesets-Documentation)
- [Strech Goals](#Strech-Goals)
- [Issues We Faced](Issues-We-Faced)
- [Resources](#Resources)
- [Credits](#Credits)
## Goals

This week's project goal was to implement a search bar with an auto-complete feature with some key notes

- The front end send a get request to the back end.
- The back end fetched the data from an api or a file and returns it to the front end.
- Use at least 1 API.
- contain a least 2 routes.

## Introduction  

our initial goal was to use a simple external api to fetch the auto-complete suggestions from,
so we went back the the giphy api (which we used on one of the previous workshop) that already has this feature integrated into it.

and one thing lead to the other and we ended up creating a "simplified" giphy like clone.



## Sketches
there were the sketchs we based our project on, created in Figma to help us visualize the end result.


### Concept Desktop view

<div style="display:flex;">
    <div style="display:flex;flex-direction:column;align-items:center;">
        <img src="https://i.imgur.com/o6Y6rj8.png?1" /> 
    </div> 
    &nbsp;&nbsp;
    <div style="display:flex;flex-direction:column;align-items:center">
        <img src="https://i.imgur.com/zS8rJQJ.png?1"/> 
    </div>
    
</div>

### Concept Mobile view
 <div style="display:flex;">
    <div style="display:flex;flex-direction:column;align-items:center;">
        <img src="https://i.imgur.com/jrarrbx.png?1" /> 
    </div> 
    &nbsp;&nbsp;
    <div style="display:flex;flex-direction:column;align-items:center">
        <img src="https://i.imgur.com/Hme0Kj0.png?1"/> 
    </div>
</div>

<br><br>


```sequence
SeachBar->BEnd: Send the search Value
Note right of BEnd: The APIs wementioned\nare working now
BEnd-->SeachBar: Sends the whole data
Note left of SeachBar: First Displayes the\nwallpaper
SeachBar->BEnd: Asks if needs to load more
```



## The Final Product

 <div style="display:flex;">
    <div style="display:flex;flex-direction:column;align-items:center;">
     <h3>Realtime Mobile view</h3>
     <img src="https://media.giphy.com/media/RLnAa4Gh3F6TTuTjx9/giphy.gif" /> 
    </div> 
    &nbsp;&nbsp;
    <div style="display:flex;flex-direction:column;align-items:center">
      <h3>Realtime Desktop view</h3>
     <img src="https://media.giphy.com/media/Kc35mbwbQ9hPMZHKaX/giphy.gif"/> 
    </div>
</div>



## How it works

Once you enter the website, you search for gifs, and while you're typing it provides you with some autocomplete suggestions as it tries to load gifs for the partial query.

If you're looking for another intresting topic to load, our suggestion bubbles will do the trick. just by clicking on one of  related suggestions bellow/above the search bar you will trigger a new gifs search.

The gifs are relatively small but once you click on one of them it enlarges as a popup. and if you want to return to the search results, a simple click outside of the enlarged gif (or hitting the escape button) will seffice.

and to make thing less boring, The page will load gifs as you scroll infinitly!! (or untill your phone/computer crashes)

## Keynote Features 

1. Support for mobile - Mobile first approach.
2. Suggestions that related to your search keywords.
3. "Random" website background Wallpaper.
4. Displaying GIFs when clicking on it (Press outside the frame/use Esc to exit).
5. infinite scrolling.


### Backend Requesets Documentation

- "/**search**?**q**=.....&**count**=....&**start**=..." &nbsp;<u>**OR**</u>&nbsp;      "/**trending**?**q**=.....&**count**=....&**start**=..."
    - **q:** search quary.
    - **[optional]** count: the number of returned/retrieved elements 
    *(default: 25 items)*.
    - **[optional]** start: the starting index of the elements to be retrieved
    *(default: 0 )*.
    - **return:** an array of objects [example](https://i.imgur.com/a1uLR9V.png) and [example](https://i.imgur.com/kG8hCH3.png).
    
<br>

- "/**autocomplete**?**q**=........" 
    - **return:** an array of strings.
    
<br>

- "/**suggestions**?**q**=........" 
    - **return:** an array of strings.
    
<br>

- "/**wallpaper**?**type**=random"
    - the "/wallpaper" will return a new photo every day.
    - **[optional]** type: if equals "random", returns a random photo out of the last 7 days photos.
    


## Strech Goals
- change the page's theme/color scheme.
- set random sized images/gif container using the grid layout.
-  lazy load images (effect: from the center outwards effect), example {%youtube aUjBvuUdkhg %}
-  show logs in developement only
- add more testers for backend and front end :/


## Issues We Faced
- no accessabilty support.
- "tab" button does not travel between elements
- it takes time for the wallpaper to load.


## We had fun
![](https://media1.giphy.com/media/ulv4Jwz3R0MHC/giphy.gif?cid=236016229813dbdaa77d1ba39fc05bcdb57dc5d86465591f&amp;rid=giphy.gif&quot)


## Resources
1. [Moris :)](https://github.com/MorisR)
2. [Google](https://google.com)
3. [Giphy Api Documentation](https://developers.giphy.com/docs/sdk)
4. [Node.js Documentation](https://nodejs.org/api/index.html)
4. [background Image Api Documentation](https://github.com/TimothyYe/bing-wallpaper)
5. [Icons](https://www.flaticon.com)


## Credits
- Giphy.com
- [TimothyYe/bing-wallpaper](https://github.com/TimothyYe/bing-wallpaper) + bing.com
- Flaticon.com

