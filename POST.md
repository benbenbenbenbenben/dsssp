### I made a library to visualize and edit audio filters

Hey everyone!

# The Story Behind

Several years ago, I was deep-dived into reverse engineering the parameter system used in VAG (Volkswagen, Audi, Porsche, etc) infotainment units. I managed to decode their binary format for storing settings for each car model and body style. To explain it simply - the firmware contains equalizer configurations for each channel of the on-board 5.1 speaker system, calibrated based on cabin volume and other parameters, much like how home theater systems are configured (with specific gains, delays, limiters, etc).

I published this research for the car enthusiast community. While the interest was huge, the reach remained small since most community members weren't familiar with HEX editors. Only a few could really replicate what I documented. After some time, I built a web application that visualized these settings and allowed to unpack, edit and repack that data back into the binary format.

When I first tried to visualize audio filters with that project, I hit a wall. There are tons of charting libraries out there - you know, those "enterprise-ready business visualization solutions." But **NONE** of them is designed for audio-specific needs. D3.js is the only real option here - it’s powerful but requires days of digging through docs just to get basic styling right. And if you want interactive features like drag-and-drop? Good luck with that. (Fun fact: due to D3's multiple abstraction layers, just **the same** filter calculations in DSSSP are 1.4-2x faster than D3's implementation).

# Nowadays

Looking back, the original project was pretty messy (spaghetti code, honestly) and had a very specific focus. However, this experience led me to realize that the visualization library itself could have broader applications in audio processing software.

This insight pushed me to develop a custom, vector-based graph from scratch using a modern React stack. The library focuses on one thing: **audio filters**. No unnecessary abstractions, no stock tickers — just a set of fast and convenient (I hope!?) tools for professional audio software.

# Core Features

- Logarithmic frequency response visualization
- Interactive biquad filter manipulation
- Custom audio calculation engine
- Drag-and-drop + Mouse wheel controls
- Flexible theming API

# Technical Details

- Built with React + SVG (no Canvas)
- Zero external dependencies besides React
- Full TypeScript support

# Live [Demo](https://dsssp.io/demo) & [Docs](https://dsssp.io/docs/?path=/docs/introduction--docs)

This is the first public release, landing page is missing, and the backlog is huge, and doc is incomplete.
_(You know, there's never a perfect timing - I just had to stop implementing my ideas and make it community driven)._

I'd love to see what you could build with these components. What's missing? What could be improved?

I'm still lacking the understanding of how it could gain some cash flow, while staying open-source. Any ideas?
