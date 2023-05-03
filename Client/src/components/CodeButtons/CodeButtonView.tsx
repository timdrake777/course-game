interface Props {
  onClick: (newString: string) => void
}

const CodeButtonView = (props: Props) => {
  return (
    <button className="bg-cyan-400 font-medium text-lg text-white shadow-[0_4px_0_0_#078d93] py-0.5 px-4 rounded-xl hover:brightness-125" onClick={() => props.onClick("character.")}>
      <span>character</span>
    </button>
  );
};

export default CodeButtonView;
