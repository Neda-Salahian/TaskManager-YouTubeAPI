import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const data = [
    {
      title: 'Projects',
      content: `nibh, sollicitudin fringilla ante placerat eget. In in vulputate neque. Mputate tellus ut sodales interdum. Nam non diam aliquam, iaculis enim vitae, imperdiet eros. Praesent lacinia pretium ante, quis rhon Donec sed lectus diam. Quisque a vehicula tortor, at viverra quam. Vecus ex auris eu tortor in est porttitor efficiturFusce sit amet purus id lacCurabitur posuere ligulaus rutrum dapibus. Fusce et dictum nisi, in vs lacus. Nam sit amet mauris ut sapien varius tincidunt in in velit.stibolutpat leo. in vel risus. Aliquam dignissim lectus sit amet odio malesuada eleifend. Quisque ligula erat, vestibulum vel massa nec, lobortis convalliulum posuere sem eu erat egestas, ut tempor sem ultrices. Curabitur vulaliquam vitae. Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
    },
    {
      title: 'Tasks',
      content: `nibh, sollicitudin fringilla ante placerat eget. In in vulputate neque. Mputate tellus ut sodales interdum. Nam non diam aliquam, iaculis enim vitae, imperdiet eros. Praesent lacinia pretium ante, quis rhon Donec sed lectus diam. Quisque a vehicula tortor, at viverra quam. Vecus ex auris eu tortor in est porttitor efficiturFusce sit amet purus id lacCurabitur posuere ligulaus rutrum dapibus. Fusce et dictum nisi, in vs lacus. Nam sit amet mauris ut sapien varius tincidunt in in velit.stibolutpat leo. in vel risus. Aliquam dignissim lectus sit amet odio malesuada eleifend. Quisque ligula erat, vestibulum vel massa nec, lobortis convalliulum posuere sem eu erat egestas, ut tempor sem ultrices. Curabitur vulaliquam vitae. Maecenas et eros nec leo ultrices rhoncus eget ac odio.`,
    },
  ];

const Sidebar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Sidebar
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/Admin" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        {/* <NavLink exact to="/tables" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
                        </NavLink> */}
                        {/* <NavLink exact to="/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
                        </NavLink> */}
                        <NavLink exact to="/analytics" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>

                        {/* <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                        </NavLink> */}

                        {/* <CDBSidebarMenu title="Sidemenu" icon="th">
                        <CDBAccordion data={data} hideIcon />
                        </CDBSidebarMenu> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;