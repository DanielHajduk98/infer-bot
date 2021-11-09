<template>
  <FlowProvider
    v-for="elem in chatFlowState"
    :id="elem.id"
    :key="elem.id"
    :flow="chatFlowState"
    :props="elem.props"
    :state="elem.state"
  >
    <component :is="elem.component" />
  </FlowProvider>
  <MessageInput :shown="store.$state.show_input" @message="handleMessage" />
</template>

<script>
import { useFlowStore } from "../stores/flow.store.js";
import { chatFlowState } from "../utils/flow.core.js";
import Introduction from "../components/flow/initial/Introduction.vue";
import InitialInteraction from "../components/flow/initial/InitialInteraction.vue";
import GenderQuestion from "../components/flow/initial/GenderQuestion.vue";
import AgeQuestion from "../components/flow/initial/AgeQuestion.vue";
import Question from "../components/flow/initial/Question.vue";
import IncomprehensibleAnswer from "../components/flow/parse/IncomprehensibleAnswer.vue";
import PlainMessage from "../components/flow/PlainMessage.vue";
import UserResponse from "../components/flow/parse/UserResponse.vue";
import ObviousAnswer from "../components/flow/parse/ObviousAnswer.vue";
import NotObviousAnswer from "../components/flow/parse/NotObviousAnswer.vue";
import QuestionSingle from "../components/flow/questions/QuestionSingle.vue";
import QuestionGroupSingle from "../components/flow/questions/QuestionGroupSingle.vue";
import Results from "../components/flow/results/Results.vue";
import TriageRecomendation from "../components/flow/results/TriageRecomendation.vue";
import TriageAlarmingSymptoms from "../components/flow/results/TriageAlarmingSymptoms.vue";
import RiskfactorRegion from "../components/flow/initial/RiskfactorRegion.vue";
import RiskfactorSuggestions from "../components/flow/initial/RiskfactorSuggetions.vue";

export default {
  components: {
    Introduction,
    InitialInteraction,
    GenderQuestion,
    AgeQuestion,
    PlainMessage,
    Question,
    UserResponse,
    ObviousAnswer,
    NotObviousAnswer,
    IncomprehensibleAnswer,
    QuestionSingle,
    QuestionGroupSingle,
    Results,
    TriageRecomendation,
    TriageAlarmingSymptoms,
    RiskfactorRegion,
    RiskfactorSuggestions,
  },
  setup() {
    const store = useFlowStore();

    function handleMessage(e) {
      store.input_value = e;
    }

    return {
      store,
      chatFlowState,
      handleMessage,
    };
  },
};
</script>

<style lang="scss">
.divider {
  margin-top: 14px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(10, minmax(min-content, min-content));
}
.divider-grid {
  margin-top: 16px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
}
</style>
