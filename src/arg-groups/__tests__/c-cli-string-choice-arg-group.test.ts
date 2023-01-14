import { runAndCatch } from '@carnesen/run-and-catch';
import { renderCCliDescription } from '../../c-cli-description';
import { CCliNoopColor } from '../../c-cli-noop-color';
import { CCliUsageError } from '../../c-cli-usage-error';
import { CCliStringChoiceArgGroup } from '../c-cli-string-choice-arg-group';

const description = 'my special string choice';
const hidden = true;
const placeholder = '<special>';
const optional = true;

const argGroup = CCliStringChoiceArgGroup.create({
	choices: ['foo', 'bar'] as const,
	description,
	hidden,
	placeholder,
	optional,
});

describe(CCliStringChoiceArgGroup.name, () => {
	it('parse returns the zeroth element of args', () => {
		expect(argGroup.parse(['foo'])).toBe('foo');
	});

	it('parse throws usage error "expected one of" if args is an empty array', async () => {
		const exception = await runAndCatch(argGroup.parse, []);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch(/expected <special> to be one of/i);
		expect(exception.message).toMatch(/foo, bar/i);
	});

	it('parse throws usage error "invalid argument ... expected one of" if args has a bad value', async () => {
		const exception = await runAndCatch(argGroup.parse, ['baz']);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch(/expected <special> to be one of/i);
		expect(exception.message).toMatch(placeholder);
	});

	it('returns undefined if args is', () => {
		const argGroup2 = CCliStringChoiceArgGroup.create({
			choices: ['foo', 'bar'],
		});
		expect(argGroup2.parse(undefined)).toBe(undefined);
	});

	it('attaches config properties', () => {
		expect(argGroup.hidden).toBe(hidden);
		expect(argGroup.placeholder).toBe(placeholder);
		expect(argGroup.optional).toBe(optional);
	});

	it('has experimental _suggest api', async () => {
		expect(await argGroup._suggest!([])).toEqual(['foo', 'bar']);
		expect(await argGroup._suggest!(['foo'])).toEqual([]);
	});

	it('includes the choices in the rendered arg group description', () => {
		const rendered = renderCCliDescription(argGroup.description, {
			color: CCliNoopColor.create(),
		});

		expect(rendered).toMatch('Choices');
		expect(rendered).toMatch('foo');
	});
});
