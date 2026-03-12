# AI Report (IDB.ai.md)

## Summary of AI Interactions

### Tools Used

ChatGPT

---

### Categories of AI Assistance

#### 1. Debugging Help

Since we added more files for the Visualization pages, we had to properly link them to the Navigation Bar and the App. Once I added it, my locally hosted site was not loading at all. With the help of AI, I was able to see that the files had a typo of "providervisualizations" versus "provider-visualizations" so the page was not linking correctly.

---

#### 2. Conceptual Clarification

When we initially pushed the Visualization pages, we had an issue where the charts were too big on phone screens which resulted in them being cut off. ChatGPT explained what page responsiveness is in regards to chart components, and how we needed it to scale dynamically.

---

#### 3. Code Improvement

Since it was our first time using D3, our first attempts at creating the charts was not working. ChatGPT helped us improve our code by explaining how to properly get the data.

---

#### 4. Alternative Approaches

Since generating the charts took a few seconds to load, our Visualization pages would be blank upon first click. We asked ChatGPT what an alternative approach would be. Since we wanted to keep the data model live, we decided it was best to add a spinner so that the user sees some activity while waiting for the result.

---

## Reflection on Use

### What specific improvements to your code or understanding came from this AI interaction?

It helped me understand D3 and how to create charts.

---

### How did you decide what to keep or ignore from the AI's suggestions?

The AI would suggest convoluted steps to take in order to accomplish something simple. For example, it suggested creating a chart component file for the design of the visualizations, which would require more imports and changing each jsx file for the charts. We decided that a simple design for our Visualization pages was best and stuck to how we have it now.

---

### Did the AI ever produce an incorrect or misleading suggestion? How did you detect that?

Yes, the AI suggested to use Tailwind CSS since it did not have the context for the type of toolstack we are using. Since it was different, we could immediately tell.

---

## Evidence of Independent Work

### Code Change Example

**Before (AI suggestion):**

```javascript
return (
  <div>
    <svg ref={svgRef} width={700} height={380}></svg>
  </div>
)
```

**After (Your modification):**

```javascript
return (
  <div
    style={{
      width: "100%",
      maxWidth: "700px",
      margin: "0 auto",
    }}
  >
    <svg
      ref={svgRef}
      viewBox="0 0 700 380"
      style={{ width: "100%", height: "auto", display: "block" }}
    ></svg>
  </div>
);

```


**What I learned:**

Before the design was not scaling responsive. After, it was responsive and centered. Charts with a fixed width and height do not scale and will be cut off on smaller screens like mobile devices. Using ```viewBox="0 0 width height"``` lets the SVG preserve its coordinate system and scale correctly without breaking the chart.

---

## Integrity Statement

**"I confirm that the AI was used only as a helper (explainer, debugger, reviewer) and not as a code generator. All code submitted is my own work."**

**Date:** December 1, 2025

---
