const usePathHandler = () => {
  return {
    path: {
      survey: '/survey',
      surveyCreate: '/survey/create',
      surveyDetail: '/survey/:surveyId',
      surveyEdit: '/survey/:surveyId/edit',
    },
  };
};

export default usePathHandler;
