/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals = config.externals || [];
        config.externals.push(({ context, request }, callback) => {
          if (request && request.includes("esbuild")) {
            return callback(null, "commonjs " + request);
          }
          callback();
        });
      }
      return config;
    },
  };
  
  export default nextConfig;