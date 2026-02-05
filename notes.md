# CS 260 Notes

[My startup - Outdaily](https://startup.outdaily.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 13.222.172.114

I was able to successfully create an aws server (although I didn't click the free tier unfortunately). Everything worked fine, until I tried to run the server and found that I had accidentally chosen the wrong AMI and needed to change that. I figured this out because I could ssh onto the server but there was nothing there, and thus when I tried to access it through the web interface nothing came up. So, I deleted the first instance of the server and restarted with the correct AMI, and then everything worked as expected.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

Here is the link to the codepen page that I forked for the structure assignment: [structure](https://codepen.io/FPErfvv/pen/GgqryBr)
Here is the link to the codepen page that I forked for the input html practice:
[input](https://codepen.io/FPErfvv/pen/myERXYG)
Here is the link to the codepen page for the media practice: [media](https://codepen.io/FPErfvv/pen/zxBNRgN)

When copying the files over, I accidentally ran the script from the wrong directory (where my pem file was held). This caused it to copy everything from that directory over, which I didn't want, so I have to make sure to run it inside the simon-html so it only copies content there.


## CSS

Here is my codepen for the basic CSS practice: [css](https://codepen.io/FPErfvv/pen/yyJXvJv)

Here is my codepen for the Declarations CSS practice: [Declarations](https://codepen.io/FPErfvv/pen/XJKgZMy)

Here is my codepen for the animation/styling practice: [animation](https://codepen.io/FPErfvv/pen/emzRwXJ)

Here is my codepen for the bootstrap practice: [bootstrap](https://codepen.io/FPErfvv/pen/emzewzr)

The key thing that I learned with CSS was in order to learn how to style a page, you have to practice and play around with all of the different elements. Whether it me using a CSS or stylesheet, or a framework, you just have to
play around to figure out what to use when, and which specific names and codes do what. 


## React Part 1: Routing

I was playing around with react and was able to edit the default vite practice project:
![Image](images/vitepractice.png)
Here is the codepen to practice playing around with React: [react](https://codepen.io/FPErfvv/pen/ogLMxvr)

Here is the codepen to practice playing around with routers: [routers](https://codepen.io/FPErfvv/pen/ogLMxNr)

I found that by following the instructions on canvas, everything went quite smoothly. I didn't have any trouble with simon or with doing the same with my own application. Once I had figured out how simon worked, I was able to easily transfer that to do my own application quite quickly. One think I had to be careful of was that at times there were html tags that I didn't put the closing `/` on, which didn't cause any trouble with my html but threw errors in the jsx. But, it was an easy fix and everything worked smoothly after that. 

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
