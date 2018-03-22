import _ from 'lodash';
import chatMessages from './chatMessages.js';
import { randomNumberWithMinimum } from './utils.js';

const parentCommands = (game, config) => {
  return {
    runSnakePit: () => {
      let time = (randomNumberWithMinimum(0) * 10000) + config.firstHack;
      let snakePitRuns = game.state.snakePitRuns
      _.delay(() => game.errorInSnakePitGame(), time);
      game.setState({runSnakePit: true, snakePitRuns: snakePitRuns + 1 });
    },
    startBashChat: () => {
      game.setState({startBashChat: true});
      _.delay(() => {game.props.onAddChatHistory(chatMessages['logOn'])}, config.logOnToChat);
      _.delay(() => {game.props.onAddChatHistory(chatMessages['logOnSuccess'])}, config.logOnToChatSuccess);
      _.delay(() => {game.props.onAddChatHistory(chatMessages['first'])}, config.firstChatMessage);
    },
    chatResponse: (value) => {
      let response = chatMessages[value];
      if (response.staggered) {
        let staggeredFunc = new Promise((resolve, reject) => {
          _.forEach(response.staggered, (message, idx) => {
            _.delay(() => {
              game.props.onAddChatHistory(message)
              if (idx === response.staggered.length - 1) {
                resolve('Fire On Update Delivered Messages');
              }
            }, config.staggeredResponse + (idx * 2000));
          });
        });
        staggeredFunc.then(() => game.props.onUpdateDeliveredMessages(value));
      } else {
        _.delay(() => {
          game.props.onAddChatHistory(chatMessages[value])
          game.props.onUpdateDeliveredMessages(value)
        }, config.regularResponse);
      }
    }
  }
};

export default parentCommands
