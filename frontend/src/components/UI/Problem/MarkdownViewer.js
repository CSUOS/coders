/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import {
	Paper,
	Table,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
	TableContainer,
} from '@material-ui/core';
import 'katex/dist/katex.min.css';
import emoji from 'emoji-dictionary';

const OutlinedPaper = (props) => {
	return <Paper variant="outlined">{props.children}</Paper>;
};

const MarkdownViewer = (props) => {
	const newProps = {
		escapeHtml: false,
		plugins: [RemarkMathPlugin],

		renderers: {
			/* 각 element에 대한 렌더링 방식을 정의할 것. */
			/* 아래에서 정의하지 않은 element는 ReactMarkdown의 기본 방식을 따름. */
			text: (props) =>
				props.value.replace(/:[^:\s]*(?:::[^:\s]*)*:/gi, (name) =>
					emoji.getUnicode(name)
				),
			break: () => <br />,
			paragraph: (props) => (
				<p className="markdown_paragraph">{props.children}</p>
			),
			emphasis: (props) => (
				<em className="markdown_emphasis">{props.children}</em>
			),
			link: (props) => (
				<a className="markdown_link" href={props.href}>
					{props.children}
				</a>
			),
			linkReference: (props) => (
				<a className="markdown_link" href={props.href}>
					{props.children}
				</a>
			),
			strong: (props) => (
				<strong className="markdown_strong">{props.children}</strong>
			),
			delete: (props) => <del>{props.children}</del>,
			list: (props) =>
				props.start ? (
					<ol className="markdown_ol">{props.children}</ol>
				) : (
					<ul className="markdown_ul">{props.children}</ul>
				),
			listItem: (props) => (
				<li className="markdown_list_item">{props.children}</li>
			),
			blockquote: (props) => (
				<blockquote className="markdown_blockquote">
					{props.children}
				</blockquote>
			),
			code: (props) => (
				<pre className="markdown_pre">
					<code>{props.value}</code>
				</pre>
			),
			table: (props) => (
				<TableContainer
					className="markdown_table_container"
					component={OutlinedPaper}
				>
					<Table>{props.children}</Table>
				</TableContainer>
			),
			tableHead: (props) => <TableHead>{props.children}</TableHead>,
			tableBody: (props) => <TableBody>{props.children}</TableBody>,
			tableRow: (props) => <TableRow>{props.children}</TableRow>,
			tableCell: (props) => {
				const className = props.isHeader
					? 'markdown_header_cell'
					: 'markdown_body_cell';
				const align = props.align ? props.align : 'center';
				return (
					<TableCell className={className} align={align}>
						{props.children}
					</TableCell>
				);
			},
			inlineCode: (props) => (
				<code className="markdown_inline_code">{props.value}</code>
			),
			math: (props) => <BlockMath>{props.value}</BlockMath>,
			inlineMath: (props) => <InlineMath>{props.value}</InlineMath>,
		},
	};

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<ReactMarkdown className="markdown_viewer" {...props} {...newProps} />
	);
};

export default MarkdownViewer;
