#version 300 es 
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

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

    float radius = 0.4;

    vec2 mouse = (2.0 * u_mouse - u_resolution.xy) / u_resolution.y;

    // The circles
    vec2 circle2_center = mouse;
    float circle1 = sdf_circle(p, radius);
    float circle2 = sdf_circle(p - circle2_center, radius / 2.0);

    // Smooth Minimum
    float d = smin(circle1, circle2, 0.7);

    // threshold color based on distance
    vec3 color = d < 0. ? vec3(0.) : vec3(1.);
    fragColor = vec4(color, 1.0);
}