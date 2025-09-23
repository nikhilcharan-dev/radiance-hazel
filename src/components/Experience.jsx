import {Text, useFBX} from "@react-three/drei";
import Avatar from "./Avatar.jsx";
import { useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {useFrame, useThree} from "@react-three/fiber";
import CloudBase from "./CloudBase.jsx";
import Throne from "./Throne.jsx";
import {useControls} from "leva";


export const Experience = ({ setChanges }) => {

    const avatarRef = useRef(null);
    const textRef = useRef(null);
    const throneRef = useRef(null);
    const { camera, mouse } = useThree();

    const [avatarAnimations, setAvatarAnimations] = useState(0);

    const [show, setShow] = useState(0);

    const timeline = gsap.timeline();

    useEffect(() => {
        if (!camera || !textRef.current || !throneRef.current) return;

        textRef.current.material.opacity = 0;
        textRef.current.material.transparent = true;


        timeline.to(camera.position, {
            x: 0,
            y: 0,
            z: 5,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => camera.updateProjectionMatrix(), // refresh orthographic projection
        });

        timeline.to(camera, {
                zoom: 250,
                duration: 2,
                ease: "power2.easeIn",
                onUpdate: () => camera.updateProjectionMatrix(),
            },
            "-=1.5");

        timeline.call(() => {
            setAvatarAnimations(prev => prev + 1);
        })

        timeline.to(textRef.current.material, {
            opacity: 1,        // fade in
            duration: 2,
            ease: "power2.out"
        });

        timeline.to(textRef.current.position, {
            x: 0,
            y: 1.3,
            z: -10,
            duration: 1,
            delay: 1
        })

        timeline.to(textRef.current.scale, {
            x: 0.3,
            y: 0.3,
            z: 0.3,
            duration: 1,
        }, "-=1")

        timeline.to(throneRef.current.position, {
            y: -0.5,
            duration: 4,
            ease: "power2.easeInOut",
        }, "-=4")

        timeline.to(textRef.current, {
            letterSpacing: 0.5,
            duration: 2,
            ease: "power2.easeOut",
        }, "-=1.5")

        timeline.to(throneRef.current.position, {
            z: -.1,
            duration: 1,
            ease: "power2.easeOut",
        })

        timeline.call(() => setAvatarAnimations(prev => prev + 1), null,"-=1")

    }, [camera])

    return (
        <>
            <Text
                ref={textRef}
                font='/fonts/hoshiki_satsuki.ttf'
                position={[0.1, 0, -10]}
                fontSize={0.6}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                Nikhil&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Charan
            </Text>

            <group ref={avatarRef}>
                <Avatar
                    position={[0,-1,0]}
                    timeline={timeline}
                    avatarAnimations={avatarAnimations}
                />
                <group ref={throneRef} position={[0, -20, -0.5]}>
                    <Throne scale={.7} />
                </group>
            </group>

            <Text
                visible={false}
                font='/fonts/hoshiki_satsuki.ttf'
                fontSize={0.1}
                color="black"
            >
                Hey There!

            </Text>

        </>
    );
};
