export function getMapList() {
    return new Promise((resolve, reject) => {
        resolve([
            {
                name: 'q3dm1',
                title: 'Arena Gate',
                source: 'Orignal Quake 3 Arena',
                description: 'Included in the demo. This arena is an excellent way to start off the Quake III Arena experience; the guys at id Software chose well. It\'s a very simple level, with two main rooms connected by a small branching corridor. The outdoor room has a rocket launcher, some armor shards and health, while the indoor room has a plasma gun, red armor, and some more health. In the corridor lies health and a shotgun. It\'s a simple map, although as would be expected the outdoor room (with the rocket launcher) tends to lead to "king of the mountain" type scenarios.'
            },
            {
                name: 'q3dm2',
                title: 'House of Pain',
                source: 'Orignal Quake 3 Arena',
                description: 'Another good introductory arena. The rocket launcher is in a closed room, and there is a moat-filled passage leading through the center of the arena which leads to a red armor and some health. In the area above the internal moat is a platform where there is ammunition, a shotgun, and the haste powerup spawn point. '
            },
            {
                name: 'q3dm3',
                title: 'Arena of Death',
                source: 'Orignal Quake 3 Arena',
                description: 'This is a fairly modest two-level arena, with the red armor on the top catwalk, and the main weapon respawn alternating between the rocket launcher and the plasma gun. It also contains the first appearance of the grenade launcher; it is located on the diametrically opposite side of the arena, in a dark alcove. '
            },
            {
                name: 'q3dm4',
                title: 'The Place of Many Deaths',
                source: 'Orignal Quake 3 Arena',
                description: 'This is an interesting arena with a quad damage respawn point, and an upper level which can be reached with stairs which contains a rocket launcher. The lower level contains a plasma gun and shotgun. '
            },
            {
                name: 'q3dm5',
                title: 'The Forgotten Place',
                source: 'Orignal Quake 3 Arena',
                description: 'This is a two-level arena with an upper catwalk which contains red armor, a lower level which spans through several large rooms, and several tight corridors. The rocket launcher is contained in a small, vulnerable alcove in the main room; the plasma gun is to be had in the other major room. '
            },
            {
                name: 'q3dm6',
                title: 'The Forgotten Place',
                source: 'Orignal Quake 3 Arena',
                description: 'This relatively large arena has pretty much everything -- numerous upper levels, a precarious walk over some isolated mesas to get the red armor, ammunition, and the personal teleporter, and an extensive central room which contains a quad damage at its base and a rocket launcher at the top (accessible from below via a bounce pad). This one is complex enough to make for a very interesting battle, but not so large that players can\'t find each other. '
            },
            {
                name: 'q3dm7',
                title: 'Temple of Retribution',
                source: 'Orignal Quake 3 Arena',
                description: 'Included in the demo. This is a well-rounded level with a lot of interesting areas. The main area contains a catwalk over a lava moat, a railgun, and a quad damage respawn point, and has a small area beyond the lava moat which leads to an isolated room with the mega health and a gate. Another major nexus is the wide room with the overlying catwalk containing the rocket launcher, a personal teleporter, and a trigger which opens a gate in the floor to an underground area with a cache of health, armor, and red armor. This underground passage leads to yet another major area, an open area which contains the rocket launcher and a plasma gun. Finally, there is a room with a sloping corridor that contains some green health and a plasma gun, and is the point the isolated gate takes you to. '
            },
            {
                name: 'q3dm8',
                title: 'Brimstone Abbey',
                source: 'Orignal Quake 3 Arena',
                description: 'Areas of this arena are very reminiscent of Q3CTF3, but a little exploration reveals that they are similar in vague appearance only. Most noteworthy is that, in the place you might expect a flag, is a powerup respawn point that alternates between the quad damage and invisibility. There is a central, relatively deep moat, which contains some health and the red armor, and is surrounded by several levels and a bounce pad. '
            },
            {
                name: 'q3dm9',
                title: 'Hero\'s Keep',
                source: 'Orignal Quake 3 Arena',
                description: 'This is an example of arena that looks a lot larger than it is, although fog of death hazards are ubiquitous. There are only three significant rooms in this arena, connected by narrow corridors: a room with an acceleration pad back and forth to a small, isolated platform which contains the rocket launcher; a room featuring an acceleration pad to the railgun and another clever sequence of bounce pads which lead to a high-placed platform containing the red armor; and a rather nondescript room which contains the plasma gun and some health. '
            },
            {
                name: 'q3dm10',
                title: 'The Nameless Place',
                source: 'Orignal Quake 3 Arena',
                description: 'This arena is a rather large, complex maze of corridors and stairs and shafts, surrounding a main, exposed hallway which contains the yellow armor leading to a tight T-junction where the rocket launcher rests. Perched on various catwalks and ledges are red armor, a plasma gun, and a lightning gun. '
            },
            {
                name: 'q3dm11',
                title: 'Deva Station',
                source: 'Orignal Quake 3 Arena',
                description: 'Another instant classic arena. This one\'s large but has lots of things to do: a rocket launcher surrounding a partial moat of slime, a plasma gun leading to an empty cliff with a bounce pad in the middle that can get you to a hovering mega health, and a curious hidden passage that leads through a gate to the quad damage, but also an instant barrage of automated grenade fire (get it and run!), past which is the haste on a platform surrounded by health. '
            },
            {
                name: 'q3dm12',
                title: 'The Dredwerkz',
                source: 'Orignal Quake 3 Arena',
                description: 'This is one of my favorite arenas. It is relatively large, and has it all: sniping points (coupled with antisniping points), an underwater passage leading to a regeneration powerup, nearly every weapon in the Quake III Arena arsenal, and acceleration and bumper pads galore. This arena even contains the first appearance of the BFG (perched in a room accessible either via teleporter or the underwater passage). '
            },
            {
                name: 'q3dm13',
                title: 'Lost World',
                source: 'Orignal Quake 3 Arena',
                description: 'Lost World is something of a deviation from the arenas immediately following t and preceding it; it is another multilevel, half-in, half-out arena with most of the weapons but without the BFG. The rocket launcher is placed on a catwalk near a vulnerable alcove where the quad damage powerup spawn point is located. '
            },
            {
                name: 'q3dm14',
                title: 'Grim Dungeons',
                source: 'Orignal Quake 3 Arena',
                description: 'This arena is a bilevel affair with a few topside rooms, including a main courtyard (with a lowered center, containing a mega health under an overhang) which contains a rocket launcher at one end and BFG ammunition at the other, as well as a personal teleporter in a side room. The "dungeons" below contain several areas where a wrong step will toss you into the fog of death; in particular, one room contains a small runaround and a moving platform which, when carefully traversed, will take you to the BFG. (A passage down near the teleporter will also bring you to the isolated BFG platform.) '
            },
            {
                name: 'q3dm15',
                title: 'Demon Keep',
                source: 'Orignal Quake 3 Arena',
                description: 'Another BFG arena, although this time it\'s harder to get to; in the large strangely-shaped platform outside (over the lava lake), a carefully placed rocketjump will get you to a bounce pad, which if hit right (a little below center is just right) will spring you up through the air, into the BFG, and onto a platform containing the red armor. There is also an area underneath where a tight catwalk contains the quad damage, but three pendulums swing back and forth threatening to squash any player that gets in the way (all they need do is touch you). '
            },
            {
                name: 'q3dm16',
                title: 'The Bouncy Map',
                source: 'Orignal Quake 3 Arena',
                description: 'From this point out all the arenas hover over the void. This arena is a relatively straightforward (and small) affair but is loaded with bounce pads. It has a symmetrical layout with a railgun perched on the thin wall separating the two mirror imaged sides; one side contains a rocket launcher and rockets and the other contains a plasma gun and ammunition. '
            },
            {
                name: 'q3dm17',
                title: 'The Longest Yard',
                source: 'Orignal Quake 3 Arena',
                description: 'Included in the demo, The Longest Yard rapidly became one of the most popular Quake III Arena maps. It contains several bounce pads which can juggling people back and forth between two levels, where rocket launchers are easy to find. A central bounce pad can send you up to get a hovering mega health, and one of the other bounce pads can send you to second one, which in turn will launch you up onto the highest platform of all, containing quad damage and a teleporter to the red armor in the center of a walkway. Finally and accelerator pad can launch players to a small, offset platform which contains a railgun. '
            },
            {
                name: 'q3dm18',
                title: ' Space Chamber',
                source: 'Orignal Quake 3 Arena',
                description: 'This is one of the less popular space arenas. It is rather cluttered. It features a hovering rocket launcher which can be reached either by acceleration pad or bounce pad. Further there is a small ridge with stairs leading away on top of which is a railgun. There are numerous bounce pads to the different catwalks and platforms. '
            },
            {
                name: 'q3dm19',
                title: 'Apocalypse Void',
                source: 'Orignal Quake 3 Arena',
                description: 'Another one of the favorites, this arena actually contains numerous platforms which move up and down rhythmically. This arena contains most of the standard weapons and powerups, in addition to the flight powerup, which makes its first and last appearance. '
            },
            {
                name: 'q3tourney1',
                title: 'Powerstation 0218',
                source: 'Orignal Quake 3 Arena',
                description: 'The tournament with Sarge. It\'s the simplest of the tournament levels, and is relatively well-stocked; each substantial room contains a large pillar in the middle which makes for some interesting and non-trivial combat. There\'s a rocket launcher in a dead end, a powerup spawn point that alternates between quad damage and regeneration, and a shotgun.'
            },
            {
                name: 'q3tourney2',
                title: 'The Proving Grounds',
                source: 'Orignal Quake 3 Arena',
                description: 'The tournament with Hunter; it was included in the demo. This arena is somewhat large for two, but it\'s got a simple enough layout that makes it acceptable for this role. It has a symmetrical layout, with a "catacombs" type layout, with a topside area and an area beneath, which can be reached either by dropping through the platform in the main room topside, or by following passages to stairs around the outsides. The main room topside contains numerous armor shards and the yellow armor; the central room underneath contains several bounce pads to reach the top and a rocket launcher. In the underground area that the passages lead to contains some more yellow armor, health, and a lightning gun. '
            },
            {
                name: 'q3tourney3',
                title: 'Hell\'s Gate',
                source: 'Orignal Quake 3 Arena',
                description: 'This is the tournament with Klesk. The arena is small, and contains three precarious catwalks over fog of death. On either side of those catwalks are two small, defensible rooms; one contains the red armor (beneath) and the other contains the rocket launcher (above). A railgun is perched on one side in the open. In the middle of the center catwalk is a respawn point for the battle suit (its first appearance). '
            },
            {
                name: 'q3tourney4',
                title: 'Vertical Vengeance',
                source: 'Orignal Quake 3 Arena',
                description: 'The tournament against Anarki (the only bot, incidentally, to have a colored name). This arena is small but involved; it is multilevel and has a central enclosed (also multilevel) building, which contains an acceleration pad to the railgun. Outside on the various levels is a rocket launcher, the red armor, mega health, and the other weapons. '
            },
            {
                name: 'q3tourney5',
                title: 'Fatal Instinct',
                source: 'Orignal Quake 3 Arena',
                description: 'The last tournament before the final showdown, this time with Uriel. This is a fairly nondescript level (its only salient features being a central courtyard containing the rocket launcher and a short staircase up to a catwalk along the walls). What makes this arena unique (and rather difficult) is that it is filled with a pervasive and very thick yellowish fog, which hampers your vision but not Uriel\'s. '
            },
            {
                name: 'q3tourney6',
                title: 'The Very End of You',
                source: 'Orignal Quake 3 Arena',
                description: 'This is the final tournament with Xaero. There are two main platforms, accessible with acceleration pads, and an interesting arrangement where symmetrical acceleration pads lead to bounce pads which then land the player in a platform containing a BFG with a low ceiling -- which a floating trigger, when shot, will come crashing down on any hapless player (or, after it stays shut for a few moments, will cause any player just reaching the pads to hit the enclosure and fall into the void). Another interesting, but relatively unused feature of this arena is another platform off to the side which contains a mega health and a teleporter, which is accessible via a moving platform which cycles back and forth between the two halves of the arena. '
            },
            {
                name: 'q3ctf1',
                title: 'Dueling Keeps',
                source: 'Orignal Quake 3 Arena',
                description: 'A very reasonable introduction to capture the flag, this arena is a symmetric area with two bases separated by a central courtyard. The courtyard contains in a depressed area in the middle where the red armor respawns, and rocket launchers and health on either side. Each base is connected to the central courtyard by windows (which fire and carefully maneuvering players can traverse) and a door, which then lead to a branching passage, one of which leads the low way to the flag room, and the other the high way. The high way contains the actual platform where the flag is located, and the low way contains a depressed area with rocket armor, a plasma gun, and a yellow armor, ending with a bounce pad that leads to the high platform. '
            },
            {
                name: 'q3ctf2',
                title: 'Troubled Waters',
                source: 'Orignal Quake 3 Arena',
                description: 'This is another symmetric arena, but with each flag area separated by a moat. Each flag area is actually underground. The flag area is on a platform about halfway up the wall with an angled bounce pad to provide access, as well as to a high catwalk overlooking the flag room where defenders can camp. The central moat also connects to each team\'s base by means of an underground, underwater passage. '
            },
            {
                name: 'q3ctf3',
                title: 'The Stronghold',
                source: 'Orignal Quake 3 Arena',
                description: 'A fairly large, symmetric capture the flag arena. The central area contains plasma guns as well as alternating spawns for invisibility and regeneration, and three exits on each side toward the bases -- two via staircase, and one via a floor-level passage. Each staircase leads to the high entrance to the flag room symmetrically on each side, which encounters red armor, lots of green health, an arc of armor shards, and a rocket launcher. The low passage leads through a small, almost maze-like area that enters the flag room from the bottom, with somewhat precarious walkways up to the top of a ramp where the flag rests. The high way connects to this room by a precarious upper passage down an easily defended corridor. '
            },
            {
                name: 'q3ctf4',
                title: 'Space CTF',
                source: 'Orignal Quake 3 Arena',
                description: 'One of the perennial favorites, this is the one and only capture the flag arena with platforms floating in space. Each player starts with a shotgun, and the two bases are connected by various platforms with bounce and acceleration pads. Most noteworthy is the BFG that is floating high above the large platforms, accessible via a tiny platform that slides back and forth underneath it, which can be reached by a well-timed jump off of one of the angled bounce pads from the center platform which contains the mega health. '
            },
            {
                name: 'ospdm1',
                title: 'New Edge',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm2',
                title: 'Batcula',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm3',
                title: 'Scrap Metal ][ - TE',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm4',
                title: 'Bitter Embrace - TE',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm5',
                title: 'Deep Inside',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm6',
                title: 'Suicide',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm7',
                title: 'The Dancehall',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm8',
                title: 'The Chastity Belt Duel (Orange remix)',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm9',
                title: 'Anticipating Oblivion - TE',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm10',
                title: 'Apologie',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm11',
                title: 'The Olden Domain',
                source: 'OSP',
                description: ''
            },
            {
                name: 'ospdm12',
                title: 'Deschutes',
                source: 'OSP',
                description: ''
            },
            {
                name: 'pro-q3dm6',
                title: 'The Campgrounds II',
                source: 'Id Software, Inc.',
                description: 'This relatively large arena has pretty much everything -- numerous upper levels, a precarious walk over some isolated mesas to get the red armor, ammunition, and the personal teleporter, and an extensive central room which contains a quad damage at its base and a rocket launcher at the top (accessible from below via a bounce pad). This one is complex enough to make for a very interesting battle, but not so large that players can\'t find each other. '
            },
            {
                name: 'pro-q3dm13',
                title: 'Lost World II',
                source: 'Id Software, Inc.',
                description: 'Lost World is something of a deviation from the arenas immediately following t and preceding it; it is another multilevel, half-in, half-out arena with most of the weapons but without the BFG. The rocket launcher is placed on a catwalk near a vulnerable alcove where the quad damage powerup spawn point is located. '
            },
            {
                name: 'pro-q3tourney2',
                title: 'The Proving Grounds II',
                source: 'Id Software, Inc.',
                description: ''
            },
            {
                name: 'pro-q3tourney4',
                title: 'Vertical Vengeance II',
                source: 'Id Software, Inc.',
                description: ''
            }
        ])
    })
}
