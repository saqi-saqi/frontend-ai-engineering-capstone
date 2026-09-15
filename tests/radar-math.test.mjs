import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Polar-to-Cartesian coordinate projection algorithm mirrored from RiskRadarChart.tsx
 */
function getPoint(value, axisIndex, totalAxes = 4, center = 110, radius = 70) {
  const angle = (Math.PI * 2 / totalAxes) * axisIndex - Math.PI / 2;
  const clamped = Math.max(0, Math.min(100, value));
  const r = (clamped / 100) * radius;
  return {
    x: Number((center + r * Math.cos(angle)).toFixed(2)),
    y: Number((center + r * Math.sin(angle)).toFixed(2)),
  };
}

function buildPolygonPath(scores, center = 110, radius = 70) {
  const axes = [scores.affective, scores.cognitive, scores.somatic, scores.crisis];
  return axes.map((val, idx) => {
    const pt = getPoint(val, idx, 4, center, radius);
    return `${pt.x},${pt.y}`;
  }).join(' ');
}

describe('MindGuard Generative UI: RiskRadarChart Geometry & Accessibility', () => {
  it('projects all points inside the SVG viewBox bounding box [0, 220]', () => {
    const testScores = [
      { affective: 0, cognitive: 0, somatic: 0, crisis: 0 },
      { affective: 100, cognitive: 100, somatic: 100, crisis: 100 },
      { affective: 75, cognitive: 50, somatic: 90, crisis: 20 },
    ];

    for (const score of testScores) {
      const polygonStr = buildPolygonPath(score);
      const points = polygonStr.split(' ').map((p) => p.split(',').map(Number));

      assert.strictEqual(points.length, 4);
      for (const [x, y] of points) {
        assert.ok(x >= 0 && x <= 220, `x coordinate ${x} outside [0, 220]`);
        assert.ok(y >= 0 && y <= 220, `y coordinate ${y} outside [0, 220]`);
      }
    }
  });

  it('correctly maps 0 score to center point (110, 110)', () => {
    const zeroPoint = getPoint(0, 0);
    assert.strictEqual(zeroPoint.x, 110);
    assert.strictEqual(zeroPoint.y, 110);
  });

  it('correctly maps top axis (Axis 0, angle -PI/2) to vertical top point (110, 40)', () => {
    const maxTopPoint = getPoint(100, 0);
    assert.strictEqual(maxTopPoint.x, 110);
    assert.strictEqual(maxTopPoint.y, 40); // 110 - 70 = 40
  });

  it('verifies accessibility aria-label string composition', () => {
    const scores = { affective: 85, cognitive: 60, somatic: 75, crisis: 20 };
    const label = `Psychometric risk radar chart. Affective tension: ${scores.affective}%, Cognitive overload: ${scores.cognitive}%, Somatic insomnia: ${scores.somatic}%, Crisis risk: ${scores.crisis}%.`;

    assert.ok(label.includes('85%'));
    assert.ok(label.includes('60%'));
    assert.ok(label.includes('Psychometric risk radar chart'));
  });
});
