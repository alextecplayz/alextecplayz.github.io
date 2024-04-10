---
layout: post
lang: en
locale: en_US
title: "Exploring the Use of Math and Matrices in Video Games and Unreal Engine 5"
description: "In this article, we take a closer look at the use of math and matrices in video games, and explore how the latest version of the Unreal Engine makes use of them."
date: 2022-12-16 16:06:00 +0200
categories: Post
image_banner_link: https://i.ibb.co/9qvXX40/MM.png
image_banner_alt: 
metadata_proglang:
metadata_platforms:
metadata_timespan:
toc: <a class="header-button monospace semibold" href="#landing">Top</a><br><a class="header-button monospace semibold" href="#preface--what-im-talking-about">Preface | What I'm talking about</a><br><a class="header-button monospace semibold" href="#introduction--what-are-matrices">Introduction | What are matrices?</a><br><a class="header-button monospace semibold" href="#matrices-in-popular-games">Matrices in popular games</a><br><a class="header-button monospace semibold" href="#matrices-in-unreal-engine-5">Matrices in Unreal Engine 5</a><br><a class="header-button monospace semibold" href="#conclusion">Conclusion</a><br>
---

*Mathematics and matrices play a crucial role in the development and design of modern video games. From character movement and animation to physics and lighting, math is at the heart of many of the features and functions we take for granted in today's games. In this article, we will take a closer look at the use of math and matrices in video games, and explore how the latest version of the Unreal Engine, Unreal Engine 5, makes use of these important tools to create stunning and immersive game worlds.*

## Preface | What I'm talking about

The use of matrices in popular games and game engines has become increasingly important in recent years, as they provide a powerful tool for representing and manipulating 3D objects and their transformations. In this project, we will explore the role of matrices in popular games and in Unreal Engine 5, the latest version of the popular game engine developed by Epic Games.

We will begin by discussing the use of matrices in popular games, such as open-world games, racing games, and sports games. We will explain how matrices are used to represent and manipulate 3D objects and their transformations, such as translation, rotation, and scaling. We will also provide examples of specific games that use matrices in their development.

Next, we will turn our attention to Unreal Engine 5 and its use of matrices. We will discuss how matrices are used in Unreal Engine 5 to represent and manipulate 3D objects and their transformations. We will also describe the various features and capabilities of Unreal Engine 5 that rely on matrices, such as its real-time rendering engine, physics simulation, and artificial intelligence.

In conclusion, we will summarize the main points covered in the project and discuss the importance of matrices in game development and their role in enabling advanced features and realistic graphics in modern games. We will also consider potential future developments in the use of matrices in games and game engines, such as the use of machine learning and other advanced technologies.

## Introduction | What are matrices?

In video games, the virtual world is made up of a vast number of objects, each with its own position, orientation, and size. To render these objects on the screen and make them move and interact with each other, game engines like Unreal Engine use mathematical concepts like matrices.

First, let's take a look at what matrices are and how they work.

Matrices are rectangular arrays of numbers that can be used to represent and manipulate data in various ways. For example, a matrix can be used to represent a 3D point or a 3D vector, which are fundamental concepts in computer graphics. A 3D point can be represented by a matrix of the form:

{% highlight cpp %}
[x y z 1]
{% endhighlight %}

where x, y, and z are the coordinates of the point in 3D space, and the 1 at the end is called the "homogeneous coordinate". A 3D vector can be represented by a matrix of the form:

{% highlight cpp %}
[x y z 0]
{% endhighlight %}

where x, y, and z are the components of the vector, and the 0 at the end indicates that it is not a point, but a direction. Matrices can be combined using matrix multiplication, which is a powerful mathematical operation that allows us to perform a variety of transformations on 3D points and vectors.

## Matrices in popular games

Matrices are an essential tool in the development of popular games, as they provide a convenient way to represent and manipulate 3D objects and their transformations. In first-person shooters, for example, matrices are used to represent the position, orientation, and scale of objects in the game world, such as weapons, enemies, and buildings. These matrices are then used to perform various transformations, such as moving the objects relative to the player's viewpoint or rotating them to match the player's aim.

Racing games also make extensive use of matrices to represent and manipulate the 3D models of vehicles and tracks. In these games, matrices are used to translate, rotate, and scale the models to match the movement of the vehicles and the curvature of the tracks. Matrices are also used to perform collision detection, allowing the game to accurately simulate the physical interactions between vehicles and obstacles.

Sports games also rely on matrices to represent and manipulate the 3D models of players, stadiums, and other objects. In these games, matrices are used to perform a wide range of transformations, such as moving players along the field or court, rotating them to match their orientation, and scaling them to match their size relative to other objects. Matrices are also used to perform collision detection, allowing the game to simulate the physical interactions between players and other objects.

Some examples of popular games that use matrices in their development include Grand Theft Auto: San Andreas, Forza Horizon, and FIFA. In GTA, matrices are used to represent and manipulate the 3D models of weapons, vehicles, entities, and environments. They're also used as data storage, as they're capable of storing vast amounts of data (e.g. A car's properties, a NPC's position). In Forza Horizon 5, matrices are used to represent and manipulate the 3D models of vehicles and tracks. And in FIFA, matrices are used to represent and manipulate the 3D models of players, stadiums, and other objects.

![A GIF of a few cars racing in the desert in Forza Horizon 5](https://i.ibb.co/hfVPHKv/giphy.gif "A GIF of a few cars racing in the desert in Forza Horizon 5")

Here's Grand Theft Auto: San Andreas, using matrices (structs) to store parameters used in the game:

{% highlight cpp %}
// ------------------
// CMatrix (size 0x3C || 60)
// Matrix used to store an entities coordinates and rotation
// ------------------

struct CMatrix
{
	float	XRotation	[3];	// 0x0 || 0
	float	YRotation	[3];	// 0xC || 12
	float	ZRotation	[3];	// 0x18 || 24
	BYTE	zPadding0	[12];
	float	Position	[3];	// 0x30 || 48
};
{% endhighlight %}
‎
Text source ([Pastebin](https://pastebin.com/f5ed36b9))

‎
![An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, in his house.](https://i.ibb.co/jLdL4kt/Grand-Theft-Auto-San-Andreas-SLUS-20946-20221213185357.png "An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, in his house.")

Here's another example, this time with the struct of a vehicle, where properties like mass, primary and secondary paint, and car grip values are stored. (Do note that this struct fragment has been heavily shortened in this code block to reduce unnecessary stuff.)

{% highlight cpp %}
// ------------------
// CVehicle (size 0xA18 || 2584)
// Structure used to store information on vehicles in use
// ------------------
‎
struct CVehicle
{
	float	Mass		// 0x8C || 140
	unsigned char	PrimaryColours	[2];	// 0x434 || 1076
	unsigned char	SecondaryColours	[2];	// 0x436 || 1078
	CPed*	PedsInVehicle	[8];	// 0x460 || 1120 (Driver is the first)
	float	Health;			// 0x4C0 || 1216
};
{% endhighlight %}

Text source ([Pastebin](https://pastebin.com/f5ed36b9))

![An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a blue four-seater car with its headlights turned on, and the front right door open. An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a brown four-seater coupe car with a broken windshield, the left front door open, and the hood missing, with the engine smoking dark gray, a sign that the car is heavily damaged.](https://i.ibb.co/XkwKtLL/Grand-Theft-Auto-San-Andreas-SLUS-20946-20221215194552.jpg "An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a blue four-seater car with its headlights turned on, and the front right door open. An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a brown four-seater coupe car with a broken windshield, the left front door open, and the hood missing, with the engine smoking dark gray, a sign that the car is heavily damaged.")
‎
![An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a blue four-seater car with its headlights turned on, and the front right door open. An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a brown four-seater coupe car with a broken windshield, the left front door open, and the hood missing, with the engine smoking dark gray, a sign that the car is heavily damaged.](https://i.ibb.co/hF6hkcw/Grand-Theft-Auto-San-Andreas-SLUS-20946-20221215194922.jpg "An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a blue four-seater car with its headlights turned on, and the front right door open. An image of GTA San Andreas' main protagonist, Carl 'CJ' Johnson, next to a brown four-seater coupe car with a broken windshield, the left front door open, and the hood missing, with the engine smoking dark gray, a sign that the car is heavily damaged.")

Generally, matrices are used for data storage, 3D graphics and to manipulate objects' size, position, rotation, orientation, among other things.

## Matrices in Unreal Engine 5

Unreal Engine 5 is the latest version of the popular game engine developed by Epic Games, and it makes extensive use of matrices to represent and manipulate 3D objects and their transformations. In Unreal Engine 5, matrices are used to represent the position, orientation, and scale of objects in the game world, allowing developers to easily move, rotate, and scale objects as needed. Matrices are also used to perform a wide range of other transformations, such as deforming objects to match the shape of a terrain or animating objects to match a character's movements.

![Two spinning cubes in Unreal Engine 5.1](https://i.ibb.co/B2XyZjf/Cubes.gif "Two spinning cubes in Unreal Engine 5.1")

Unreal Engine 5 also makes use of matrices in its real-time rendering engine, which uses matrices to transform 3D objects into the 2D images that are displayed on the screen. This allows Unreal Engine 5 to accurately represent the position, orientation, and scale of objects in the game world, as well as the perspective of the camera. Matrices are also used in Unreal Engine 5's physics simulation, which uses matrices to represent the motion and interactions of objects in the game world.

In addition, Unreal Engine 5 makes use of matrices in its artificial intelligence systems, which use matrices to represent the state and behavior of NPCs (non-player characters) in the game world. Matrices are used to represent the positions, orientations, and velocities of NPCs, as well as their relationships with other NPCs and the environment. This allows Unreal Engine 5 to simulate the behavior of NPCs in a realistic and responsive manner.

![A GIF demonstrating AI in Unreal Engine 5.1 pathfinding around a level](https://i.ibb.co/ZxsBnXc/UE5-AI.gif "A GIF demonstrating AI in Unreal Engine 5.1 pathfinding around a level")

Overall, the use of matrices in Unreal Engine 5 is crucial for its advanced features and realistic graphics, and it plays a central role in the development of modern games using this game engine.

## Conclusion

In this project, we have explored the use of matrices in popular games and in Unreal Engine 5, the latest version of the popular game engine developed by Epic Games. We have discussed the role of matrices in popular games, such as first-person shooters, racing games, and sports games, and explained how matrices are used to represent and manipulate 3D objects and their transformations. We have also discussed the use of matrices in Unreal Engine 5, including its real-time rendering engine, physics simulation, and artificial intelligence.

Overall, we have seen that matrices are an essential tool in game development, as they provide a convenient and powerful way to represent and manipulate 3D objects and their transformations. Matrices are used in a wide range of popular games and game engines, and they play a crucial role in enabling advanced features and realistic graphics in modern games.

Looking to the future, it is likely that the use of matrices in games and game engines will continue to evolve and expand, as developers continue to push the boundaries of what is possible with these technologies. We may see the use of machine learning and other advanced technologies to improve the performance and capabilities of matrices in games, leading to even more sophisticated and immersive gaming experiences.
