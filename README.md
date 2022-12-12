# advent-2022
Let's see how far I get before the holiday gets out of control

## Reflections

Started out in the first couple of days with tons of little tests.  Felt overkill.
Moved back to larger functions with bigger tests, but sometime returning extra data for inspection.
Pulling out chunks of repetitive code to test the key calculations as they come up.  

Day 8 - Having one direction have zero trees should not zero out the visible surface.  I think this requirement is flawed - space = left x right x up x down.  Think we should pull out all the zero values, and only multiple the non-zero values.  Unless we feel like if we can't see a tree in one direction then we don't want to live there.

Day 9 - Tricky second part.  Left out the extra moves.  Struggled with too much code then realized the moves were pretty simple.  OO helped here.