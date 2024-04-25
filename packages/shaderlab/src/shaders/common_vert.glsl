#ifdef RENDERER_HAS_SKIN
  #ifdef RENDERER_USE_JOINT_TEXTURE
    sampler2D renderer_JointSampler;
    float renderer_JointCount;

    mat4 getJointMatrix(sampler2D smp, float index)
    {
        float base = index / renderer_JointCount;
        float hf = 0.5 / renderer_JointCount;
        float v = base + hf;

        vec4 m0 = texture2D(smp, vec2(0.125, v ));
        vec4 m1 = texture2D(smp, vec2(0.375, v ));
        vec4 m2 = texture2D(smp, vec2(0.625, v ));
        vec4 m3 = texture2D(smp, vec2(0.875, v ));

        return mat4(m0, m1, m2, m3);
    }

    #else
        mat4 renderer_JointMatrix[ RENDERER_JOINTS_NUM ];
    #endif
#endif

vec4 material_TilingOffset;