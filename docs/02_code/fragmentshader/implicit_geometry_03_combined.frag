#version 300 es 
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 fragColor;


// return value is positive if point is outside,
// negative if p is inside of the circle
float sdf_circle(vec2 p, float radius)
{
    return length(p) - radius;
}

float smin(float a, float b, float k)
{
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * (1.0 / 4.0);
}

void main()
{
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
    float radius = 0.2;

    // The circles
    vec2 circle1_center = vec2(.5, 0.);
    vec2 circle2_center = vec2(-0.5, 0.);
    vec2 circle3_center = vec2(sin(u_time) * 0.4, 0.);

    float circle1 = sdf_circle(p - circle1_center, radius);
    float circle2 = sdf_circle(p - circle2_center, radius);
    float circle3 = sdf_circle(p - circle3_center, radius / 1.8);

    float d = min(circle1, circle2);

    // Union of shapes 
    d = min(d, circle3);

    // Intersection
    // d *= max(d, circle3);

    // Smooth Minimum
    // d = smin(d, circle3, 0.05);

    // threshold color based on distance
    vec3 color = d < 0. ? vec3(0.) : vec3(1.);
    fragColor = vec4(color, 1.0);
}