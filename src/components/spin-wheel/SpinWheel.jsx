import { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing, Dimensions } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const degToRad = (deg) => deg * (Math.PI / 180);

const getPoint = (angle, radius) => {
  const radian = degToRad(angle);
  return {
    x: radius * Math.cos(radian),
    y: radius * Math.sin(radian),
  };
};

const circlePath = (R) => `
  M ${R} 0 
  a ${R} ${R} 0 1 1 ${-2 * R} 0 
  a ${R} ${R} 0 1 1 ${2 * R} 0 
  Z
`;

function SpinWheel({
  data = [],
  holeSize = 0,
  textInfo = { size: 40, weight: 'bold', color: '#333' },
  state = 'pause',
  spinCount = 10,
  onResult = () => {},
  onUpdate = () => {},
}) {
  const sectorLength = data.length || 1;

  const screenWidth = Dimensions.get('window').width;
  const rouletteSize = Math.round(screenWidth * 0.8);
  const offsetAngle = -90;
  const radius = rouletteSize / 2;
  const hRadius = holeSize / 2;
  const itemAngle = 360 / sectorLength;

  const [spinning, setSpinning] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const randomTurns = 5 + Math.random() * 3;
    const randomAngle = randomTurns * 360;
    Animated.timing(rotation, {
      toValue: randomAngle,
      duration: 2500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      const finalAngle = (randomAngle % 360 + 360) % 360;
      rotation.setValue(finalAngle);

      // CORRECTION : Le marqueur est en haut (à -90°), donc on doit ajuster le calcul
      const normalizedAngle = (finalAngle + 90 + 360) % 360;
      
      // Trouver le secteur correspondant
      const selectedIndex = Math.floor(normalizedAngle / itemAngle) % sectorLength;

      if (data[selectedIndex]) {
        onResult(data[selectedIndex]);
      }
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (state === 'running' && !spinning) {
      spin();
    }
    if (state === 'reset') {
      rotation.setValue(0);
      onUpdate('pause');
    }
  }, [state]);

  return (
    <View style={{ alignItems: 'center', margin: 20 }}>
      <Svg
        width={40}
        height={40}
        style={{ position: 'absolute', top: 0, left: '50%', marginLeft: -20, zIndex: 10 }}
      >
        <Path
          d="M 20 0 L 30 20 L 10 20 Z"
          fill="#f90"
          stroke="#111"
          strokeWidth={2}
          transform="rotate(180 20 10)"
        />
      </Svg>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg
          width={rouletteSize}
          height={rouletteSize}
          viewBox={`${-radius} ${-radius} ${rouletteSize} ${rouletteSize}`}
        >
          <Path d={`${circlePath(radius)} ${circlePath(hRadius)}`} fill="#d9d9d9" stroke="#fff" strokeWidth="1" />
          <G>
            {data.map((item, i) => {
              const angle = itemAngle * i + offsetAngle;
              const textRadius = radius * 0.7;
              const pos = getPoint(angle + itemAngle / 2, textRadius);
              const rotation = angle + itemAngle / 2 + 90;
              const start = getPoint(angle, radius);
              const end = getPoint(angle + itemAngle, radius);
              const largeArcFlag = itemAngle > 180 ? 1 : 0;
              const d = [
                `M0,0`,
                `L${start.x},${start.y}`,
                `A${radius},${radius} 0 ${largeArcFlag} 1 ${end.x},${end.y}`,
                `Z`,
              ].join(' ');
              return (
                <G key={`section-${i}`}>
                  <Path
                    d={d}
                    fill="#fff"
                    stroke="#111"
                    strokeWidth={2}
                    opacity="1"
                  />
                  <SvgText
                    x={pos.x}
                    y={pos.y}
                    fontSize={textInfo.size}
                    fontWeight={textInfo.weight}
                    fill={textInfo.color}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${rotation} ${pos.x} ${pos.y})`}
                  >
                    {item.name}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: '#333',
          padding: 10,
          borderRadius: 8,
        }}
        onPress={spin}
        disabled={spinning}
      >
        <Text style={{ color: '#fff' }}>
          {spinning ? 'En cours...' : 'Tourner la roue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SpinWheel;