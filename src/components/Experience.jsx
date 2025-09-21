import {Text, OrbitControls} from "@react-three/drei";
import Avatar from "./Avatar.jsx";
import { useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";


export const Experience = () => {

    const avatarRef = useRef(null);
    const textRef = useRef(null);
    const { camera } = useThree();

    const [show, setShow] = useState(0);

    const timeline = gsap.timeline();

    useEffect(() => {
        if(!camera) return;

        // return;

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

        timeline.call(() => setShow(1))

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

        timeline.to(avatarRef.current.position, {
            x: -2,
            duration: 1,
            ease: "power2.easeInOut",
        }, "-=1")

        timeline.to(textRef.current, {
            letterSpacing: 1,
            duration: 2,
            ease: "power2.easeInOut",
        }, "-=1")

    }, [camera])

    return (
        <>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={1} />

            <Text
                ref={textRef}
                font='/fonts/hoshiki_satsuki.ttf'
                position={[0.1, 0, -10]}
                fillOpacity={show}
                fontSize={0.6}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                Nikhil&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Charan
            </Text>

            <group ref={avatarRef}>
                <Avatar key={`avatar-${show}`}  position={[0,-1,0]} />
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
