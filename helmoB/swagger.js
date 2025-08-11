// Swagger 환경 설정
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const apisPath = path.resolve(__dirname, "./routes/**/*.js").replace(/\\/g, "/");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "건설 현장 안전모 감지 API",
      version: "1.0.0",
      description: "안전모 미착용 감지 및 통계 제공 서비스 API의 문서입니다.",
    },
    components: {
      securitySchemes: {
        // 라우터 주석에서 cookieAuth를 쓰고 있으니 이것도 함께 정의
        cookieAuth: { type: "apiKey", in: "cookie", name: "token" },
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    security: [{ bearerAuth: [] }], // 기본은 bearer, 필요시 cookieAuth로도 테스트
    servers: [{ url: "http://localhost:5000" }], // 서버 주소
  },
  apis: [apisPath],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};