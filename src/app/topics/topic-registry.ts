import { Topic } from '@core/models/topic.model';
import { introductionTopic } from './01-introduction/topic';
import { typescriptTopic } from './02-typescript/topic';
import { setupCliTopic } from './03-setup-cli/topic';
import { bootstrappingTopic } from './04-bootstrapping/topic';
import { componentsTopic } from './05-components/topic';
import { dataBindingTopic } from './06-data-binding/topic';
import { signalsBasicsTopic } from './07-signals-basics/topic';
import { controlFlowTopic } from './08-control-flow/topic';
import { directivesTopic } from './09-directives/topic';
import { pipesTopic } from './10-pipes/topic';
import { componentCommunicationTopic } from './11-component-communication/topic';
import { lifecycleHooksTopic } from './12-lifecycle-hooks/topic';
import { contentProjectionTopic } from './13-content-projection/topic';
import { dynamicComponentsTopic } from './14-dynamic-components/topic';
import { servicesDiTopic } from './15-services-di/topic';
import { advancedDiTopic } from './16-advanced-di/topic';
import { routingBasicsTopic } from './17-routing-basics/topic';
import { routeParamsDataTopic } from './18-route-params-data/topic';
import { lazyLoadingTopic } from './19-lazy-loading/topic';
import { guardsResolversTopic } from './20-guards-resolvers/topic';
import { templateDrivenFormsTopic } from './21-template-driven-forms/topic';
import { reactiveFormsTopic } from './22-reactive-forms/topic';
import { customFormControlsTopic } from './23-custom-form-controls/topic';
import { signalFormsTopic } from './24-signal-forms/topic';
import { httpClientTopic } from './25-http-client/topic';
import { httpInterceptorsTopic } from './26-http-interceptors/topic';
import { rxjsBasicsTopic } from './27-rxjs-basics/topic';
import { rxjsSubjectsTopic } from './28-rxjs-subjects/topic';
import { rxjsBasicOperatorsTopic } from './29-rxjs-basic-operators/topic';
import { rxjsCombinationTopic } from './30-rxjs-combination/topic';
import { rxjsFlatteningTopic } from './31-rxjs-flattening/topic';
import { rxjsErrorsSharingTopic } from './32-rxjs-errors-sharing/topic';
import { advancedSignalsTopic } from './33-advanced-signals/topic';
import { resourcesTopic } from './34-resources/topic';
import { signalsRxjsInteropTopic } from './35-signals-rxjs-interop/topic';
import { changeDetectionTopic } from './36-change-detection/topic';
import { deferrableViewsTopic } from './37-deferrable-views/topic';
import { stateManagementTopic } from './38-state-management/topic';
import { performanceTopic } from './39-performance/topic';
import { ssrHydrationTopic } from './40-ssr-hydration/topic';
import { buildCompilationTopic } from './41-build-compilation/topic';
import { deploymentTopic } from './42-deployment/topic';
import { testingBasicsTopic } from './43-testing-basics/topic';
import { testingAdvancedTopic } from './44-testing-advanced/topic';
import { securityTopic } from './45-security/topic';
import { errorHandlingTopic } from './46-error-handling/topic';
import { animationsTopic } from './47-animations/topic';
import { i18nTopic } from './48-i18n/topic';
import { materialCdkA11yTopic } from './49-material-cdk-a11y/topic';
import { architectureTopic } from './50-architecture/topic';
import { whatsNewTopic } from './51-whats-new/topic';
import { scenariosTopic } from './52-scenarios/topic';

/**
 * Every topic in learning order (01 → 52), matching the Notion notes.
 * Routes, sidebar, search, prev/next and the home roadmap are all generated from this list.
 */
export const TOPICS: readonly Topic[] = [
  introductionTopic,
  typescriptTopic,
  setupCliTopic,
  bootstrappingTopic,
  componentsTopic,
  dataBindingTopic,
  signalsBasicsTopic,
  controlFlowTopic,
  directivesTopic,
  pipesTopic,
  componentCommunicationTopic,
  lifecycleHooksTopic,
  contentProjectionTopic,
  dynamicComponentsTopic,
  servicesDiTopic,
  advancedDiTopic,
  routingBasicsTopic,
  routeParamsDataTopic,
  lazyLoadingTopic,
  guardsResolversTopic,
  templateDrivenFormsTopic,
  reactiveFormsTopic,
  customFormControlsTopic,
  signalFormsTopic,
  httpClientTopic,
  httpInterceptorsTopic,
  rxjsBasicsTopic,
  rxjsSubjectsTopic,
  rxjsBasicOperatorsTopic,
  rxjsCombinationTopic,
  rxjsFlatteningTopic,
  rxjsErrorsSharingTopic,
  advancedSignalsTopic,
  resourcesTopic,
  signalsRxjsInteropTopic,
  changeDetectionTopic,
  deferrableViewsTopic,
  stateManagementTopic,
  performanceTopic,
  ssrHydrationTopic,
  buildCompilationTopic,
  deploymentTopic,
  testingBasicsTopic,
  testingAdvancedTopic,
  securityTopic,
  errorHandlingTopic,
  animationsTopic,
  i18nTopic,
  materialCdkA11yTopic,
  architectureTopic,
  whatsNewTopic,
  scenariosTopic,
];
