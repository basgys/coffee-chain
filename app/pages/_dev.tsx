import { useState } from "react";

import { config } from "libs/config";
import Card, { CardContent } from "components/card";
import Table from "components/table";
import Section from "layouts/section";
import Container from "layouts/container";
import { useWeb3 } from "hooks/useWeb3";

const _Dev = () => {
  const web3 = useWeb3();
  const [state, setState] = useState({
    nodeInfo: "",
    networkId: 0,
    networkType: "",
    peerCount: 0,
  });

  web3?.eth.getNodeInfo().then((n) => {
    setState((s) => ({
      ...s,
      nodeInfo: n,
    }))
  }).catch(e => {});
  web3?.eth.net.getNetworkType().then((nt) => {
    setState((s) => ({
      ...s,
      networkType: nt,
    }))
  }).catch(e => {});
  web3?.eth.net.getPeerCount().then((pc) => {
    setState((s) => ({
      ...s,
      peerCount: pc,
    }))
  }).catch(e => {});
  web3?.eth.net.getId().then((id) => {
    setState((s) => ({
      ...s,
      networkId: id,
    }))
  }).catch(e => {});

  return (
    <Container>
      <div className='header'>
        <div className="header__info">
          <h2 className="header__subtitle">
            <a href="https://github.com/basgys">basgys</a>
          </h2>
          <h1 className="header__title">Development console</h1>
        </div>

        <div className="header__actions">
        </div>
      </div>

      <Section>
        <Card>
          <h1 className="title">Web3</h1>
          <h1 className="subtitle">Web3 client configuration</h1>

          <CardContent>
            <Table full compact>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Version</td>
                  <td>{web3?.version}</td>
                </tr>
                <tr>
                  <td>Node info</td>
                  <td>{state.nodeInfo}</td>
                </tr>
                <tr>
                  <td>Network ID</td>
                  <td>{state.networkId}</td>
                </tr>
                <tr>
                  <td>Network type</td>
                  <td>{state.networkType}</td>
                </tr>
                <tr>
                  <td>Peer count</td>
                  <td>{state.peerCount}</td>
                </tr>
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Card>
          <h1 className="title">Config</h1>
          <h1 className="subtitle">Public configuration variables</h1>

          <CardContent>
            <Table full compact>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {config.map((key: string, value: any) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </Section>
    </Container>
  )
};

export default _Dev;