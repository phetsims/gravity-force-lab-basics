# Gravity Force Lab Basics - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## Model

Start by reading the model description in https://github.com/phetsims/gravity-force-lab-basics/blob/master/doc/model.md

Following that, almost all types in the model and view are inherited from the Inverse Square Law Common library. 
It will be useful to become familiar with its [model](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/model.md) 
and [implementation](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/implementation-notes.md)

The primary type in this sim is the `Mass`. It handles all positioning as well as the mass values needed to calculate the displayed
 force. It is an ISLCObject where only one of radius or density is dynamic at a time.

Unlike in Coulomb's Law, here the force can only be attractive, and it is measured from the objects' centers.

## View

The user will mainly be interacting with the ruler, the mass objects, and their control panel. The mass objects have a minimum 
separation that is always maintained. When dragging one mass, the other's position will never change. Finally, the arrows are
added to the screenviews as siblings of the mass nodes themselves. This ensures that both arrows appear in the top layer of the scene graph.

### Mass Nodes
These are instances of ISLCObjectNodes with dynamic or constant radius. See the [ISLC implementation](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/implementation-notes.md) 
for the details on updating pullers, force values, and arrows.

## Disposal

There are no dynamic pieces to this simulation, and as a result nothing is disposed.
As a result no listeners need to be unlinked or removed.