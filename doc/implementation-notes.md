# Gravity Force Lab Basics - Implementation Notes

This document contains notes that will be helpful to developers and future maintainers of this simulation.

## Model

Start by reading the model description in https://github.com/phetsims/gravity-force-lab-basics/blob/master/doc/model.md

Following that, almost all types in the model and view are inherited from the Inverse Square Law Common library. 
It will be useful to become familiar with its [model](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/model.md) 
and [implementation](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/implementation-notes.md)

The primary type in this sim is the `GFLBMass`. It handles all positioning as well as the mass values needed to 
calculate the displayed force. It is a subtype of `ISLCObject` where only radius or density is dynamic at a time.

Unlike in Coulomb's Law, here the force can only be attractive, and it is measured from the objects' centers.

This sim is a simplification of the `gravity-force-lab` simulation. Unlike some of the other "basics" sim versions at PhET,
this simulation doesn't take a subset of screens/features. Instead it simplifies the control granularity. In this sim,
sliders that can adjust the mass between 1 and 1000KG are exchanged for number pickers with only a few value options.
All of the possible masses and distances are much larger, so that the force of gravity is within a magnitude that is 
easier to grasp. This is factored out as a constant. For more info see `GFLBConstants.BILLION_MULTIPLIER`.

This sim further simplifies the "regular" sim with changes to the control panel. The "scientific notation" checkbox
is omitted, and an option to omit showing distance between the two masses is added. Toggling distance values off further 
simplifies the output, and centers the focus of the sim around the force that the two masses are acting on each other.

Despite the cognitive similarities between this simulation and `gravity-force-lab`, the basics version doesn't not 
necessariliy inherit all things from the regular version. For example. `GFLBModel` extends `ISLCModel`, not 
`GravityForceLabModel`. 

NOTE: Often in documentation comments and github issues, this sim is referred to as "BASICS" in comparison to 
gravity-force-lab as "REGULAR".

## View

The user will mainly be interacting with the ruler, the mass objects, and their control panel. The mass objects have 
a minimum separation that is always maintained. When dragging one mass, the other's position will never change. Finally, 
the arrows are added to the screenviews as siblings of the mass nodes themselves. This ensures that both arrows appear 
in the top layer of the scene graph.

This screen view adds all children directly to the PlayArea and ControlArea Nodes, which are meant for PDOM ordering. 
This pattern is nice when it works, but is atypical since often visual layering order is different from PDOM top-bottom
order. If needed in the future, `GFLBScreenView` can use `accessibleOrder` instead to accomplish a different PDOM 
structure without effecting visual ordering.

### Mass Nodes
These are instances of ISLCObjectNodes with dynamic or constant radius. See the 
[ISLC implementation](https://github.com/phetsims/inverse-square-law-common/blob/master/doc/implementation-notes.md) 
for the details on updating pullers, force values, and arrows.

## Disposal

There are no dynamic pieces to this simulation, and as a result nothing is disposed.
As a result no listeners need to be unlinked or removed.