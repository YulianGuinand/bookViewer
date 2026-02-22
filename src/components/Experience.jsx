import { Environment, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { Book } from "./Book";
import { cameraPositionAtom } from "./UI";

const CameraManager = () => {
  const [cameraPosition] = useAtom(cameraPositionAtom);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, [cameraPosition]);

  useFrame((state, delta) => {
    if (!isAnimating) return;

    easing.damp3(state.camera.position, cameraPosition, 0.4, delta);

    if (state.camera.position.distanceTo(new Vector3(...cameraPosition)) < 0.1) {
      setIsAnimating(false);
    }
  });
  return null;
};

export const Experience = () => {

  const { scene } = useThree();
  useEffect(() => {
    scene.environmentIntensity = 0.1;
  }, [scene]);

  return (
    <>
      <CameraManager />
      <Book />
      <OrbitControls />
      <pointLight position={[0, 0, 1]} intensity={1} color="white" />
      <Environment preset="studio"></Environment>
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};
