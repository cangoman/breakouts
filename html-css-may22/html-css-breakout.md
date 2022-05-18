Topics for today:

Overview of HTML/CSS
Semantic HTML

Events

CSS:
- Specificity
- Units:
    - px
    - em -> relative to the font size of the element
    - rem -> also relative, but to the root element (root em)
    - viewport units, vw and vh. 1vh is 1% of the viewport height.
- Layout:
    - position property:
        - `static` by default -> normal flow of the document (top, left, bottom, right have no effect)
        - relative: relative to where it would normally be. (if top,left,right,bottom not specified, result is same as static, but would now be a positioned element, which can affect children)
        - `absolute`: it floats the element: removes it from the document flow. offsets are relative to the closest positioned ancestor
        - `fixed`: removes from flow, position determined by offsets, relative to the viewport. (even if you scroll)
        - `sticky`: combination of relative and fixed. 
- Pseudo-classes & Pseudo-elements:
    - Pseudo-classes use a colon :
        - select an element based on some state of the element, such as `:active`, `:hover` `:checked`, `:invalid`, `nth-child` (in HTML validated forms). See more [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
        - Pseudo-elements let you select only a part of matched element. Two special ones create a new element (`::before` and `::after`)