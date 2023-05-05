import { components } from './components';
import { basicInfo } from "./basicInfo";
import { room, user } from "./routes";

export const swaggerDocument = {
   ...basicInfo,
   ...components,
   paths: { ...user, ...room }
};