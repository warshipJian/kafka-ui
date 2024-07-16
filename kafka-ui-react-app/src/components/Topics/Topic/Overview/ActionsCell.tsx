import React from 'react';
import { Action, Partition, ResourceType } from 'generated-sources';
import { CellContext } from '@tanstack/react-table';
import ClusterContext from 'components/contexts/ClusterContext';
import { RouteParamsClusterTopic } from 'lib/paths';
import useAppParams from 'lib/hooks/useAppParams';
import { Dropdown } from 'components/common/Dropdown';
import { useClearTopicMessages, useTopicDetails } from 'lib/hooks/api/topics';
import { ActionDropdownItem } from 'components/common/ActionComponent';

const ActionsCell: React.FC<CellContext<Partition, unknown>> = ({ row }) => {
  const { clusterName, topicName } = useAppParams<RouteParamsClusterTopic>();
  const { data } = useTopicDetails({ clusterName, topicName });
  const { isReadOnly } = React.useContext(ClusterContext);
  const { partition } = row.original;

  const clearMessages = useClearTopicMessages(clusterName, [partition]);

  const clearTopicMessagesHandler = async () => {
    await clearMessages.mutateAsync(topicName);
  };
  const disabled =
    data?.internal || isReadOnly || data?.cleanUpPolicy !== 'DELETE';
  return (
    <Dropdown disabled={disabled}>
    </Dropdown>
  );
};

export default ActionsCell;
